// backend/routes/cars.js
const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Get all vehicles in inventory
router.get('/inventory', (req, res) => {
  db.query('SELECT * FROM Cars_In_Inventory', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Get all vehicles owned by customers
router.get('/owned', (req, res) => {
  const query = `
      SELECT c.*, cu.F_Name, cu.L_Name
      FROM Customer_Cars c
      JOIN Owns o ON c.Car_ID = o.Car_ID
      JOIN Customers cu ON o.Customer_ID = cu.Customer_ID;
  `;
  db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

  return router;
};
