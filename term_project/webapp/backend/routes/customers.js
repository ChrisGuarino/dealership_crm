// backend/routes/customers.js
const express = require("express");

module.exports = (db) => {
  const router = express.Router();

// Get all customers
router.get('/', (req, res) => {
  db.query('SELECT * FROM Customers', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Get vehicles owned by a specific customer
router.get('/:customerId/vehicles', (req, res) => {
  const { customerId } = req.params;
  const query = `
      SELECT c.*, v.*
      FROM Owns o
      JOIN Car c ON o.Car_ID = c.Car_ID
      JOIN Vehicle_Type v ON c.Vehicle_ID = v.Vehicle_ID
      WHERE o.Customer_ID = ?;
  `;
  db.query(query, [customerId], (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Add a new customer
router.post('/', (req, res) => {
  const { F_Name, M_Init, L_Name, Phone, Email, Address } = req.body;

  // Validate input
  if (!F_Name || !L_Name || !Phone || !Email || !Address) {
      return res.status(400).json({ error: 'All fields except M_Init are required.' });
  }

  const query = `
      INSERT INTO Customers (F_Name, M_Init, L_Name, Phone, Email, Address)
      VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
      query,
      [F_Name, M_Init || null, L_Name, Phone, Email, Address],
      (err, results) => {
          if (err) {
              console.error('Error adding customer:', err);
              return res.status(500).send('Error adding customer.');
          }
          res.status(201).json({ message: 'Customer added successfully.', customerId: results.insertId });
      }
  );
});

// Delete a customer by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Check if the ID is provided
  if (!id) {
      return res.status(400).json({ error: 'Customer ID is required.' });
  }

  const query = 'DELETE FROM Customers WHERE Customer_ID = ?';

  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting customer:', err);
          return res.status(500).send('Error deleting customer.');
      }

      // Check if a customer was deleted
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Customer not found.' });
      }

      res.status(200).json({ message: 'Customer deleted successfully.' });
  });
});

// Get the total amount a customer has spent at the dealership
router.get('/:customerId/total-spent', (req, res) => {
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
          COALESCE(SUM(Purchase.Sale_Price), 0) AS Total_Vehicle_Purchases,
          COALESCE(SUM(Was_Performed.Labor_Cost), 0) AS Total_Labor_Cost,
          COALESCE(SUM(Part.Cost_Of_Part), 0) AS Total_Part_Cost,
          (
              COALESCE(SUM(Purchase.Sale_Price), 0) +
              COALESCE(SUM(Was_Performed.Labor_Cost), 0) +
              COALESCE(SUM(Part.Cost_Of_Part), 0)
          ) AS Total_Amount_Spent
      FROM 
          Customers
      LEFT JOIN 
          Owns ON Customers.Customer_ID = Owns.Customer_ID
      LEFT JOIN 
          Purchase ON Owns.Car_ID = Purchase.Car_ID
      LEFT JOIN 
          Appointment ON Customers.Customer_ID = Appointment.Customer_ID
      LEFT JOIN 
          Was_Performed ON Appointment.Appointment_ID = Was_Performed.Appointment_ID
      LEFT JOIN 
          Was_Replaced ON Appointment.Appointment_ID = Was_Replaced.Appointment_ID
      LEFT JOIN 
          Part ON Was_Replaced.Part_ID = Part.Part_ID
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
          return res.status(404).json({ error: 'No data found for this customer.' });
      }

      res.json(results[0]);
  });
});

// Get detailed information for a specific customer
router.get('/:customerId', (req, res) => {
    const { customerId } = req.params;

    // Validate input
    if (!customerId) {
        return res.status(400).json({ error: 'Customer ID is required.' });
    }

    const query = `
        SELECT 
            Customers.Customer_ID,
            Customers.F_Name,
            Customers.M_Init,
            Customers.L_Name,
            Customers.Phone,
            Customers.Email,
            Customers.Address,
            COALESCE(SUM(Purchase.Sale_Price), 0) AS Total_Purchases,
            COALESCE(SUM(Was_Performed.Labor_Cost), 0) AS Total_Service_Cost,
            COALESCE(SUM(Purchase.Sale_Price) + SUM(Was_Performed.Labor_Cost), 0) AS Total_Spent,
            GROUP_CONCAT(DISTINCT CONCAT(Vehicle_Type.Make, ' ', Vehicle_Type.Model, ' (', Vehicle_Type.Year, ')') SEPARATOR ', ') AS Cars_Owned
        FROM 
            Customers
        LEFT JOIN 
            Owns ON Customers.Customer_ID = Owns.Customer_ID
        LEFT JOIN 
            Customer_Cars ON Owns.Car_ID = Customer_Cars.Car_ID
        LEFT JOIN 
            Vehicle_Type ON Customer_Cars.Car_ID = Vehicle_Type.Vehicle_ID
        LEFT JOIN 
            Purchase ON Owns.Car_ID = Purchase.Car_ID
        LEFT JOIN 
            Appointment ON Customers.Customer_ID = Appointment.Customer_ID
        LEFT JOIN 
            Was_Performed ON Appointment.Appointment_ID = Was_Performed.Appointment_ID
        WHERE 
            Customers.Customer_ID = ?
        GROUP BY 
            Customers.Customer_ID;
    `;

    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Error fetching customer details:', err);
            return res.status(500).send('Error fetching customer details.');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Customer not found.' });
        }

        res.json(results[0]);
    });
});

  return router;
};
