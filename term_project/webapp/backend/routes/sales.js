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


  // Get all sales statistics over period of time.
  router.get('/stats', (req, res) => {
    const { startDate, endDate } = req.query;

    const query = `
        SELECT 
            COUNT(Purchase.Purchase_ID) AS Number_of_Cars_Sold,
            COALESCE(SUM(Purchase.Sale_Price), 0) AS Total_Revenue
        FROM 
            Purchase
        WHERE 
            Purchase.Date_Of_Purchase BETWEEN ? AND ?;
    `;

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) {
            console.error('Error fetching sales statistics:', err);
            return res.status(500).send('Error fetching sales statistics.');
        }

        res.json(results[0]);
    });
});

  return router;

};
