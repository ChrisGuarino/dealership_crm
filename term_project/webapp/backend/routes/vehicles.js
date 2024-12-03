// backend/routes/cars.js
const express = require("express");

module.exports = (db) => {
  const router = express.Router();

      // Helper function to make `db.query` return a Promise
      const queryPromise = (query, params = []) => {
        return new Promise((resolve, reject) => {
            db.query(query, params, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    };

// Get all vehicles in inventory with details from Vehicle_Type
router.get('/inventory', (req, res) => {
    const query = `
        SELECT 
            Cars_In_Inventory.Car_ID,
            Cars_In_Inventory.Interior,
            Cars_In_Inventory.Odometer,
            Cars_In_Inventory.Color,
            Cars_In_Inventory.Cost,
            Vehicle_Type.Vehicle_ID,
            Vehicle_Type.Make,
            Vehicle_Type.Model,
            Vehicle_Type.Year,
            Vehicle_Type.Tire_Type,
            Vehicle_Type.Engine_Type
        FROM 
            Cars_In_Inventory
        JOIN 
            Car ON Cars_In_Inventory.Car_ID = Car.Car_ID
        JOIN 
            Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching inventory with vehicle details:', err);
            res.status(500).send('Error fetching inventory.');
        } else {
            res.json(results);
        }
    });
});

// Get all vehicles owned by customers
router.get('/owned', (req, res) => {
  const query = `
SELECT 
    Customers.Customer_ID,
    CONCAT(Customers.F_Name, ' ', Customers.M_Init, '. ', Customers.L_Name) AS Customer_Name,
    Customers.Phone,
    Customers.Email,
    Customer_Cars.Car_ID,
    Customer_Cars.Interior,
    Customer_Cars.Odometer,
    Customer_Cars.Color,
    Customer_Cars.License_Plate_State,
    Customer_Cars.License_Plate,
    Vehicle_Type.Make,
    Vehicle_Type.Model,
    Vehicle_Type.Year
FROM 
    Owns
JOIN 
    Customers ON Owns.Customer_ID = Customers.Customer_ID
JOIN 
    Customer_Cars ON Owns.Car_ID = Customer_Cars.Car_ID
JOIN 
    Car ON Customer_Cars.Car_ID = Car.Car_ID
JOIN 
    Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID;

  `;
  db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

router.post('/inventory', (req, res) => {
    const { Interior, Odometer, Color, Cost, Make, Model, Year, Tire_Type, Engine_Type } = req.body;

    // Validate input
    if (!Interior || !Odometer || !Color || !Cost || !Make || !Model || !Year || !Tire_Type || !Engine_Type) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Query strings
    const typeQuery = `SELECT Vehicle_ID FROM Vehicle_Type WHERE Make = ? AND Model = ? AND Year = ?`;
    const insertTypeQuery = `
        INSERT INTO Vehicle_Type (Make, Model, Year, Tire_Type, Engine_Type)
        VALUES (?, ?, ?, ?, ?)
    `;
    const inventoryQuery = `
        INSERT INTO Cars_In_Inventory (Interior, Odometer, Color, Cost)
        VALUES (?, ?, ?, ?)
    `;
    const carQuery = `
        INSERT INTO Car (Interior, Odometer, Color, Vehicle_ID)
        VALUES (?, ?, ?, ?)
    `;

    // Step 1: Check if Type_ID exists
    queryPromise(typeQuery, [Make, Model, Year])
        .then((typeRows) => {
            if (typeRows.length > 0) {
                return typeRows[0].Vehicle_ID; // Return existing Vehicle_ID
            }

            // Step 2: Insert into Vehicle_Type if Type_ID doesn't exist
            return queryPromise(insertTypeQuery, [Make, Model, Year, Tire_Type, Engine_Type])
                .then((insertResult) => insertResult.insertId); // Return new Vehicle_ID
        })
        .then((Vehicle_ID) => {
            // Step 3: Insert into Cars_In_Inventory
            return queryPromise(inventoryQuery, [Interior, Odometer, Color, Cost])
                .then(() => Vehicle_ID); // Pass Type_ID to the next step
        })
        .then((Vehicle_ID) => {
            // Step 4: Insert into Car
            return queryPromise(carQuery, [Interior, Odometer, Color, Vehicle_ID])
                .then(() => res.status(201).json({ message: 'Vehicle added to inventory successfully.' }));
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send('Error inserting vehicle into inventory.');
        });
});

// Delete a car from inventory by ID

router.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;

  // Check if the ID is provided
  if (!id) {
      return res.status(400).json({ error: 'Car ID is required.' });
  }

  const query = 'DELETE FROM Cars_In_Inventory WHERE Car_ID = ?';

  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting car from inventory:', err);
          return res.status(500).send('Error deleting car from inventory.');
      }

      // Check if a car was deleted
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Car not found in inventory.' });
      }

      res.status(200).json({ message: 'Car deleted from inventory successfully.' });
  });
});

// Route to handle vehicle purchase
router.post('/inventory/purchase', async (req, res) => {
    const { Car_ID, Customer_ID, Date_Of_Purchase, Sale_Price } = req.body;
    console.log(req.body);

    // Validate input
    if (!Car_ID || !Customer_ID || !Date_Of_Purchase || !Sale_Price) {
        console.log(`All fields are required. Car_ID: ${Car_ID}, Customer_ID: ${Customer_ID}, Date_ID: ${Date_Of_Purchase}, Price: ${Sale_Price}`);
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Start a transaction
        await queryPromise('START TRANSACTION');

        // Step 1: Remove the vehicle from Cars_In_Inventory
        const removeFromInventoryQuery = 'DELETE FROM Cars_In_Inventory WHERE Car_ID = ?';
        const inventoryResults = await queryPromise(removeFromInventoryQuery, [Car_ID]);

        if (inventoryResults.affectedRows === 0) {
            throw new Error('Vehicle not found in inventory.');
        }

        // Step 2: Fetch the vehicle details from Car
        const getCarDetailsQuery = 'SELECT * FROM Car WHERE Car_ID = ?';
        const carDetails = await queryPromise(getCarDetailsQuery, [Car_ID]);

        if (carDetails.length === 0) {
            throw new Error('Vehicle details not found.');
        }

        const { Interior, Odometer, Color } = carDetails[0];

        // Step 3: Add the vehicle to Customer_Cars
        const addToCustomerCarsQuery = `
            INSERT INTO Customer_Cars (Car_ID, Interior, Odometer, Color, License_Plate_State, License_Plate)
            VALUES (?, ?, ?, ?, NULL, NULL)
        `;
        await queryPromise(addToCustomerCarsQuery, [Car_ID, Interior, Odometer, Color]);

        // Step 4: Add the ownership record to Owns
        const addToOwnsQuery = 'INSERT INTO Owns (Customer_ID, Car_ID) VALUES (?, ?)';
        await queryPromise(addToOwnsQuery, [Customer_ID, Car_ID]);

        // Step 5: Log the purchase in the Purchase table
        const logPurchaseQuery = `
            INSERT INTO Purchase (Purchase_ID, Date_Of_Purchase, Sale_Price, Car_ID)
            VALUES (NULL, ?, ?, ?)
        `;
        await queryPromise(logPurchaseQuery, [Date_Of_Purchase, Sale_Price, Car_ID]);

        // Commit the transaction
        await queryPromise('COMMIT');

        res.status(200).json({
            message: 'Vehicle successfully purchased and assigned to customer.',
        });
    } catch (error) {
        console.error('Error processing purchase:', error);

        try {
            // Rollback the transaction on error
            await queryPromise('ROLLBACK');
        } catch (rollbackError) {
            console.error('Error rolling back transaction:', rollbackError);
        }

        res.status(500).send('Error processing purchase.');
    }
});


// Get all purchases for a specific customer
router.get('/purchases/customer/:customerId', (req, res) => {
  const { customerId } = req.params;

  // Validate input
  if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required.' });
  }

  const query = `
      SELECT 
          Purchase.Purchase_ID,
          Purchase.Date_Of_Purchase,
          Purchase.Sale_Price,
          Car.Car_ID,
          Vehicle_Type.Make,
          Vehicle_Type.Model,
          Vehicle_Type.Year,
          Customers.Customer_ID,
          Customers.F_Name,
          Customers.L_Name
      FROM 
          Purchase
      JOIN 
          Car ON Purchase.Car_ID = Car.Car_ID
      JOIN 
          Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID
      JOIN 
          Owns ON Owns.Car_ID = Car.Car_ID
      JOIN 
          Customers ON Owns.Customer_ID = Customers.Customer_ID
      WHERE 
          Customers.Customer_ID = ?;
  `;

  db.query(query, [customerId], (err, results) => {
      if (err) {
          console.error('Error fetching purchases for customer:', err);
          return res.status(500).send('Error fetching purchases for customer.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No purchases found for this customer.' });
      }

      res.json(results);
  });
});

// Get the total amount spent by a customer on purchases
router.get('/purchases/customer/:customerId/total', (req, res) => {
  const { customerId } = req.params;

  // Validate input
  if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required.' });
  }

  const query = `
      SELECT 
          Customers.Customer_ID,
          Customers.F_Name,
          Customers.L_Name,
          SUM(Purchase.Sale_Price) AS Total_Amount_Spent
      FROM 
          Purchase
      JOIN 
          Owns ON Purchase.Car_ID = Owns.Car_ID
      JOIN 
          Customers ON Owns.Customer_ID = Customers.Customer_ID
      WHERE 
          Customers.Customer_ID = ?
      GROUP BY 
          Customers.Customer_ID, Customers.F_Name, Customers.L_Name;
  `;

  db.query(query, [customerId], (err, results) => {
      if (err) {
          console.error('Error calculating total amount spent:', err);
          return res.status(500).send('Error calculating total amount spent.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No purchases found for this customer.' });
      }

      res.json(results[0]); // Return the first result since we're grouping by customer
  });
});

router.get('/:carId/details', (req, res) => {
    const { carId } = req.params;

    const query = `
        SELECT 
            Car.Car_ID,
            Car.Interior,
            Car.Odometer,
            Car.Color,
            Vehicle_Type.Make,
            Vehicle_Type.Model,
            Vehicle_Type.Year,
            Vehicle_Type.Tire_Type,
            Vehicle_Type.Engine_Type
        FROM 
            Car
        INNER JOIN 
            Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID
        WHERE 
            Car.Car_ID = ?;
    `;

    db.query(query, [carId], (err, results) => {
        if (err) {
            console.error('Error fetching vehicle details:', err);
            return res.status(500).send('Error fetching vehicle details.');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found.' });
        }

        res.json(results[0]);
    });
});

  return router;
};
