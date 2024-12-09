// backend/routes/sales.js
const express = require("express");

module.exports = (db) => {
  const router = express.Router();

// Get all sales.
router.get('/purchases', (req, res) => {
    const query = `
        SELECT 
            Purchase.Purchase_ID,
            Purchase.Date_Of_Purchase,
            Purchase.Sale_Price,
            Purchase.Cost,
            Car.Car_ID,
            Car.Color,
            Car.Odometer,
            Vehicle_Type.Make,
            Vehicle_Type.Model,
            Vehicle_Type.Year
        FROM 
            Purchase
        INNER JOIN 
            Car ON Purchase.Car_ID = Car.Car_ID
        INNER JOIN 
            Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching purchases:', err);
            return res.status(500).send('Error fetching purchases.');
        }
        res.json(results);
    });
});

// Get all sales statistics over a period of time.
router.get('/stats', (req, res) => {
    const { startDate, endDate } = req.query;

    const query = `
        SELECT 
            COUNT(Purchase.Purchase_ID) AS Number_of_Cars_Sold,
            COALESCE(SUM(Purchase.Sale_Price), 0) AS Total_Revenue,
            COALESCE(SUM(Purchase.Sale_Price - Purchase.Cost), 0) AS Total_Profit,
            Vehicle_Type.Make,
            Vehicle_Type.Model,
            COUNT(Vehicle_Type.Vehicle_ID) AS Number_Sold_Per_Type,
            COALESCE(SUM(Purchase.Sale_Price - Purchase.Cost), 0) AS Profit_Per_Type
        FROM 
            Purchase
        INNER JOIN 
            Car ON Purchase.Car_ID = Car.Car_ID
        INNER JOIN 
            Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID
        WHERE 
            Purchase.Date_Of_Purchase BETWEEN ? AND ?
        GROUP BY 
            Vehicle_Type.Make, Vehicle_Type.Model;
    `;

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error fetching sales statistics:', err);
            return res.status(500).send('Error fetching sales statistics.');
        }

        // Summarize overall statistics
        const totalCarsSold = results.reduce((sum, row) => parseFloat(sum) + parseFloat(row.Number_Sold_Per_Type), 0);
        const totalProfit = results.reduce((sum, row) => parseFloat(sum) + parseFloat(row.Profit_Per_Type), 0);
        const totalRevenue = results.reduce((sum, row) => parseFloat(sum) + parseFloat(row.Total_Revenue), 0);

        res.json({
            summary: {
                Number_of_Cars_Sold: totalCarsSold,
                Total_Revenue: totalRevenue,
                Total_Profit: totalProfit,
            },
            byVehicleType: results,
        });
    });
});

//Get purchase details
router.get('/purchase/:purchaseId/bill', (req, res) => {
    const { purchaseId } = req.params;

    const query = `
        SELECT 
            Purchase.Purchase_ID,
            Purchase.Date_Of_Purchase,
            Purchase.Sale_Price,
            Purchase.Cost,
            Car.Color,
            Car.Interior,
            Customer_Cars.License_Plate,
            Customer_Cars.License_Plate_State,
            Vehicle_Type.Make,
            Vehicle_Type.Model,
            Vehicle_Type.Year
        FROM 
            Purchase
        INNER JOIN 
            Car ON Purchase.Car_ID = Car.Car_ID
        INNER JOIN 
            Customer_Cars ON Car.Car_ID = Customer_Cars.Car_ID
        INNER JOIN 
            Vehicle_Type ON Car.Vehicle_ID = Vehicle_Type.Vehicle_ID
        WHERE 
            Purchase.Purchase_ID = ?;
    `;

    db.query(query, [purchaseId], (err, results) => {
        if (err) {
            console.error('Error fetching purchase details:', err);
            return res.status(500).send('Error fetching purchase details.');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found for the given purchase ID.' });
        }

        res.json(results[0]);
    });
});

  return router;
};
