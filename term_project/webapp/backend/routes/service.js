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

// Delete a service appointment by ID
router.delete('/appointments/:id', (req, res) => {
  const { id } = req.params;

  // Check if the ID is provided
  if (!id) {
      return res.status(400).json({ error: 'Appointment ID is required.' });
  }

  const query = 'DELETE FROM Appointment WHERE Appointment_ID = ?';

  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Error deleting appointment:', err);
          return res.status(500).send('Error deleting appointment.');
      }

      // Check if an appointment was deleted
      if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Appointment not found.' });
      }

      res.status(200).json({ message: 'Appointment deleted successfully.' });
  });
});

// Get all service appointments for a specific customer
router.get('/appointments/customer/:customerId', (req, res) => {
  const { customerId } = req.params;

  // Validate input
  if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required.' });
  }

  const query = `
      SELECT 
          Appointment.Appointment_ID,
          Appointment.Drop_Off,
          Appointment.Pick_Up,
          Appointment.Appointment_Made_Date,
          Appointment.Car_ID,
          Time_Slot.Time_Slot_ID,
          Time_Slot.Start_Time,
          Time_Slot.End_Time,
          Time_Slot.Date AS Appointment_Date,
          Package.Package_ID,
          Package.Name AS Package_Name,
          Customers.Customer_ID,
          Customers.F_Name,
          Customers.L_Name
      FROM 
          Appointment
      JOIN 
          Customers ON Appointment.Customer_ID = Customers.Customer_ID
      JOIN 
          Time_Slot ON Appointment.Time_Slot_ID = Time_Slot.Time_Slot_ID
      JOIN 
          Package ON Appointment.Package_ID = Package.Package_ID
      WHERE 
          Appointment.Customer_ID = ?;
  `;

  db.query(query, [customerId], (err, results) => {
      if (err) {
          console.error('Error fetching service appointments:', err);
          return res.status(500).send('Error fetching service appointments.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No service appointments found for this customer.' });
      }

      res.json(results);
  });
});

// Get all parts required for a specific service package
router.get('/packages/:packageId/parts', (req, res) => {
  const { packageId } = req.params;

  // Validate input
  if (!packageId) {
      return res.status(400).json({ error: 'Package ID is required.' });
  }

  const query = `
      SELECT 
          Part.Part_ID,
          Part.Name AS Part_Name,
          Part.Cost_Of_Part,
          Task.Task_ID,
          Task.Name AS Task_Name,
          Recommends.Is_Mandatory
      FROM 
          Package
      JOIN 
          Recommends ON Package.Package_ID = Recommends.Package_ID
      JOIN 
          Task ON Recommends.Task_ID = Task.Task_ID
      JOIN 
          Failure_Requires ON Task.Task_ID = Failure_Requires.Task_ID
      JOIN 
          Part ON Failure_Requires.Part_ID = Part.Part_ID
      WHERE 
          Package.Package_ID = ?;
  `;

  db.query(query, [packageId], (err, results) => {
      if (err) {
          console.error('Error fetching parts for service package:', err);
          return res.status(500).send('Error fetching parts for service package.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No parts found for this service package.' });
      }

      res.json(results);
  });
});

// Get all additionally scheduled services for cars
router.get('/scheduled-services', (req, res) => {
  const query = `
      SELECT 
          Additionally_Scheduled.Appointment_ID,
          Task.Task_ID,
          Task.Name AS Task_Name,
          Task.Estd_Time AS Estimated_Time,
          Task.Estd_Labor_Cost AS Estimated_Labor_Cost,
          Appointment.Car_ID,
          Car.Interior,
          Car.Odometer,
          Car.Color
      FROM 
          Additionally_Scheduled
      JOIN 
          Appointment ON Additionally_Scheduled.Appointment_ID = Appointment.Appointment_ID
      JOIN 
          Task ON Additionally_Scheduled.Task_ID = Task.Task_ID
      JOIN 
          Car ON Appointment.Car_ID = Car.Car_ID;
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching additionally scheduled services:', err);
          return res.status(500).send('Error fetching additionally scheduled services.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No additionally scheduled services found.' });
      }

      res.json(results);
  });
});

// Get the total amount spent by a customer on service appointments and additional tasks
router.get('/appointments/customer/:customerId/total', (req, res) => {
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
          COALESCE(SUM(Was_Performed.Labor_Cost), 0) AS Total_Labor_Cost,
          COALESCE(SUM(Part.Cost_Of_Part), 0) AS Total_Part_Cost,
          (COALESCE(SUM(Was_Performed.Labor_Cost), 0) + COALESCE(SUM(Part.Cost_Of_Part), 0)) AS Total_Amount_Spent
      FROM 
          Appointment
      JOIN 
          Customers ON Appointment.Customer_ID = Customers.Customer_ID
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
          return res.status(404).json({ error: 'No service appointments or tasks found for this customer.' });
      }

      res.json(results[0]);
  });
});

// Get all tasks included in a specific service package
router.get('/packages/:packageId/tasks', (req, res) => {
  const { packageId } = req.params;

  // Validate input
  if (!packageId) {
      return res.status(400).json({ error: 'Package ID is required.' });
  }

  const query = `
      SELECT 
          Package.Package_ID,
          Package.Name AS Package_Name,
          Task.Task_ID,
          Task.Name AS Task_Name,
          Task.Estd_Time AS Estimated_Time,
          Task.Estd_Labor_Cost AS Estimated_Labor_Cost,
          Recommends.Is_Mandatory
      FROM 
          Recommends
      JOIN 
          Package ON Recommends.Package_ID = Package.Package_ID
      JOIN 
          Task ON Recommends.Task_ID = Task.Task_ID
      WHERE 
          Package.Package_ID = ?;
  `;

  db.query(query, [packageId], (err, results) => {
      if (err) {
          console.error('Error fetching tasks for service package:', err);
          return res.status(500).send('Error fetching tasks for service package.');
      }

      if (results.length === 0) {
          return res.status(404).json({ error: 'No tasks found for this service package.' });
      }

      res.json(results);
  });
});

// Get details of a specific service package
router.get('/packages/:packageId/details', (req, res) => {
    const { packageId } = req.params;

    const query = `
        SELECT 
            Package.Package_ID,
            Package.Name,
            GROUP_CONCAT(DISTINCT Task.Name SEPARATOR ', ') AS Tasks_Included,
            GROUP_CONCAT(DISTINCT Part.Name SEPARATOR ', ') AS Parts_Included,
            SUM(Task.Estd_Labor_Cost) AS Estd_Total_Labor_Cost,
            SUM(Task.Estd_Time) AS Estd_Total_Time
        FROM 
            Package
        LEFT JOIN 
            Recommends ON Package.Package_ID = Recommends.Package_ID
        LEFT JOIN 
            Task ON Recommends.Task_ID = Task.Task_ID
        LEFT JOIN 
            Failure_Requires ON Task.Task_ID = Failure_Requires.Task_ID
        LEFT JOIN 
            Part ON Failure_Requires.Part_ID = Part.Part_ID
        WHERE 
            Package.Package_ID = ?
        GROUP BY 
            Package.Package_ID;
    `;

    db.query(query, [packageId], (err, results) => {
        if (err) {
            console.error('Error fetching package details:', err);
            return res.status(500).send('Error fetching package details.');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Service package not found.' });
        }

        res.json(results[0]);
    });
});
;

  return router;
};
