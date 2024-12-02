// backend/routes/appointments.js
const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  // Get all service appointments
router.get('/appointments', (req, res) => {
  db.query('SELECT * FROM Appointment', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Get all service packages
router.get('/packages', (req, res) => {
  db.query('SELECT * FROM Package', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Get all parts
router.get('/parts', (req, res) => {
  db.query('SELECT * FROM Part', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});
// Add a new service appointment
router.post('/appointments', (req, res) => {
  const {
      Drop_Off,
      Pick_Up,
      Appointment_Made_Date,
      Car_ID,
      Package_ID,
      Time_Slot_ID,
      Customer_ID
  } = req.body;

  // Validate input
  if (!Drop_Off || !Pick_Up || !Appointment_Made_Date || !Car_ID || !Package_ID || !Time_Slot_ID || !Customer_ID) {
      return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `
      INSERT INTO Appointment (
          Drop_Off, Pick_Up, Appointment_Made_Date, Car_ID, Package_ID, Time_Slot_ID, Customer_ID
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
      query,
      [Drop_Off, Pick_Up, Appointment_Made_Date, Car_ID, Package_ID, Time_Slot_ID, Customer_ID],
      (err, results) => {
          if (err) {
              console.error('Error inserting appointment:', err);
              return res.status(500).send('Error inserting appointment.');
          }
          res.status(201).json({ message: 'Appointment added successfully.', appointmentId: results.insertId });
      }
  );
});


  return router;
};
