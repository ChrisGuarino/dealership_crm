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

  return router;
};
