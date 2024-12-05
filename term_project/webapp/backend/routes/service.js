// backend/routes/appointments.js
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

  // Get all service appointments
router.get('/appointments', (req, res) => {
    const query=`
    SELECT 
        Appointment.Appointment_ID,
        Package.Name AS Package_Name,
        Appointment.Customer_ID,
        Appointment.Car_ID
    FROM 
        Appointment
    JOIN
        Package ON Appointment.Package_ID = Package.Package_ID 
    `;
  db.query(query, (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});
// Get specific appointments
router.get('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Appointment WHERE Appointment_ID = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching appointment details:', err);
            return res.status(500).send('Error fetching appointment details.');
        }
        res.json(results[0]);
    });
});


// Get all service packages
router.get('/packages', (req, res) => {
  db.query('SELECT * FROM Package', (err, results) => {
      if (err) res.status(500).send(err);
      else res.json(results);
  });
});

// Get all service tasks
router.get('/tasks', (req, res) => {
    db.query('SELECT * FROM Task', (err, results) => {
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

//Add/Schedule Service Appointment
router.post('/appointments', (req, res) => {
    const {
        Start_Time,
        End_Time,
        Date,
        Drop_Off,
        Pick_Up,
        Appointment_Made_Date,
        Car_ID,
        Package_ID,
        Customer_ID,
        Additional_Tasks, // Optional field
    } = req.body;

    // Validate mandatory fields
    if (!Start_Time || !End_Time || !Date || !Drop_Off || !Pick_Up || !Appointment_Made_Date || !Car_ID || !Package_ID || !Customer_ID) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const insertTimeSlotQuery = `
        INSERT INTO Time_Slot (Start_Time, End_Time, Date)
        VALUES (?, ?, ?)
    `;
    const insertAppointmentQuery = `
        INSERT INTO Appointment (Drop_Off, Pick_Up, Appointment_Made_Date, Car_ID, Package_ID, Time_Slot_ID, Customer_ID )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertAdditionalTasksQuery = `
        INSERT INTO Additionally_Scheduled (Appointment_ID, Task_ID)
        VALUES ?
    `;

    // Step 1: Insert into Time_Slot
    queryPromise(insertTimeSlotQuery, [Start_Time, End_Time, Date])
        .then((timeSlotResult) => {
            const timeSlotId = timeSlotResult.insertId;

            // Step 2: Insert into Appointment with Time_Slot_ID
            return queryPromise(insertAppointmentQuery, [
                Drop_Off,
                Pick_Up,
                Appointment_Made_Date,
                Car_ID,
                Package_ID,
                timeSlotId,
                Customer_ID,
            ]);
        })
        .then((appointmentResult) => {
            const appointmentId = appointmentResult.insertId;

            // Step 3: Insert additional tasks only if provided
            if (Additional_Tasks && Additional_Tasks.length > 0) {
                const taskValues = Additional_Tasks.map((taskId) => [appointmentId, taskId]);
                return queryPromise(insertAdditionalTasksQuery, [taskValues]);
            }
        })
        .then(() => {
            res.status(201).json({ message: 'Appointment added successfully, including additional tasks if provided.' });
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send('Error adding appointment.');
        });
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

router.post('/was_performed', (req, res) => {
    const { appointmentId, taskId, laborCost, time } = req.body;

    if (!appointmentId || !taskId || !laborCost || !time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = `
        INSERT INTO Was_Performed (Appointment_ID, Task_ID, Labor_Cost, Time)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [appointmentId, taskId, laborCost, time], (err, results) => {
        if (err) {
            console.error('Error inserting into Was_Performed:', err);
            return res.status(500).send('Error inserting record.');
        }

        res.status(201).json({ message: 'Task successfully logged as performed.' });
    });
});

router.post('/was_replaced', (req, res) => {
    const { appointmentId, partIds } = req.body;

    if (!appointmentId || !partIds || partIds.length === 0) {
        return res.status(400).json({ error: 'Appointment ID and parts are required.' });
    }

    const query = `
        INSERT INTO Was_Replaced (Appointment_ID, Part_ID)
        VALUES ?
    `;

    // Prepare values for bulk insertion
    const values = partIds.map((partId) => [appointmentId, partId]);

    db.query(query, [values], (err) => {
        if (err) {
            console.error('Error inserting into Was_Replaced:', err);
            return res.status(500).send('Error inserting parts.');
        }

        res.status(201).json({ message: 'Parts successfully logged as replaced.' });
    });
});

router.get('/tasks/:taskId/parts', (req, res) => {
    const { taskId } = req.params;

    const query = `
        SELECT 
            Part.Part_ID,
            Part.Name,
            Part.Cost_Of_Part
        FROM 
            Failure_Requires
        INNER JOIN 
            Part ON Failure_Requires.Part_ID = Part.Part_ID
        WHERE 
            Failure_Requires.Task_ID = ?;
    `;

    db.query(query, [taskId], (err, results) => {
        if (err) {
            console.error('Error fetching parts for task:', err);
            return res.status(500).send('Error fetching parts.');
        }

        res.json(results);
    });
});

// router.get('/bill/:appointmentId', (req, res) => {
//     const { appointmentId } = req.params;

//     const query = `
//         SELECT 
//             Was_Performed.Task_ID,
//             Task.Name AS Task_Name,
//             Was_Performed.Labor_Cost,
//             Was_Performed.Time,
//             Part.Part_ID,
//             Part.Name AS Part_Name,
//             Part.Cost_Of_Part
//         FROM 
//             Appointment
//         LEFT JOIN 
//             Was_Performed ON Appointment.Appointment_ID = Was_Performed.Appointment_ID
//         LEFT JOIN 
//             Task ON Was_Performed.Task_ID = Task.Task_ID
//         LEFT JOIN 
//             Was_Replaced ON Appointment.Appointment_ID = Was_Replaced.Appointment_ID
//         LEFT JOIN 
//             Part ON Was_Replaced.Part_ID = Part.Part_ID
//         WHERE 
//             Appointment.Appointment_ID = ?;
//     `;

//     db.query(query, [appointmentId], (err, results) => {
//         if (err) {
//             console.error('Error fetching bill details:', err);
//             return res.status(500).send('Error fetching bill details.');
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ error: 'No data found for the given appointment.' });
//         }

//         // Calculate total labor cost and part cost
//         const tasks = results.filter((row) => row.Task_ID).map((row) => ({
//             Task_ID: row.Task_ID,
//             Task_Name: row.Task_Name,
//             Labor_Cost: row.Labor_Cost,
//             Time: row.Time,
//         }));

//         const parts = results.filter((row) => row.Part_ID).map((row) => ({
//             Part_ID: row.Part_ID,
//             Part_Name: row.Part_Name,
//             Cost_Of_Part: row.Cost_Of_Part,
//         }));

//         const totalLaborCost = tasks.reduce((acc, task) => acc + (parseFloat(task.Labor_Cost) || 0), 0);
//         const totalPartCost = parts.reduce((acc, part) => acc + (parseFloat(part.Cost_Of_Part) || 0), 0);
//         const totalCost = parseFloat(totalLaborCost) + parseFloat(totalPartCost);
//         res.json({
//             tasks,
//             parts,
//             totalLaborCost,
//             totalPartCost,
//             totalCost,
//         });
//     });
// });

router.get('/bill/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;

    // Query for tasks performed
    const taskQuery = `
        SELECT 
            Was_Performed.Task_ID,
            Task.Name AS Task_Name,
            Was_Performed.Labor_Cost,
            Was_Performed.Time
        FROM 
            Appointment
        LEFT JOIN 
            Was_Performed ON Appointment.Appointment_ID = Was_Performed.Appointment_ID
        LEFT JOIN 
            Task ON Was_Performed.Task_ID = Task.Task_ID
        WHERE 
            Appointment.Appointment_ID = ?;
    `;

    // Query for parts replaced
    const partQuery = `
        SELECT 
            Part.Part_ID,
            Part.Name AS Part_Name,
            Part.Cost_Of_Part
        FROM 
            Appointment
        LEFT JOIN 
            Was_Replaced ON Appointment.Appointment_ID = Was_Replaced.Appointment_ID
        LEFT JOIN 
            Part ON Was_Replaced.Part_ID = Part.Part_ID
        WHERE 
            Appointment.Appointment_ID = ?;
    `;

    try {
        // Execute both queries in parallel
        const [tasks, parts] = await Promise.all([
            db.promise().query(taskQuery, [appointmentId]),
            db.promise().query(partQuery, [appointmentId]),
        ]);

        // Extract the results
        const taskResults = tasks[0];
        const partResults = parts[0];

        // Calculate totals
        const totalLaborCost = taskResults.reduce(
            (acc, task) => acc + (parseFloat(task.Labor_Cost) || 0),
            0
        );
        const totalPartCost = partResults.reduce(
            (acc, part) => acc + (parseFloat(part.Cost_Of_Part) || 0),
            0
        );
        const totalCost = totalLaborCost + totalPartCost;

        // Respond with combined results
        res.json({
            tasks: taskResults,
            parts: partResults,
            totalLaborCost,
            totalPartCost,
            totalCost,
        });
    } catch (err) {
        console.error('Error fetching bill details:', err);
        res.status(500).send('Error fetching bill details.');
    }
});

router.get('/appointments/:appointmentId/tasks', (req, res) => {
    const { appointmentId } = req.params;

    const query = `
        SELECT DISTINCT
            Task.Task_ID,
            Task.Name
        FROM
            Appointment
        LEFT JOIN Package ON Appointment.Package_ID = Package.Package_ID
        LEFT JOIN Recommends ON Package.Package_ID = Recommends.Package_ID
        LEFT JOIN Additionally_Scheduled ON Appointment.Appointment_ID = Additionally_Scheduled.Appointment_ID
        LEFT JOIN Task ON Recommends.Task_ID = Task.Task_ID OR Additionally_Scheduled.Task_ID = Task.Task_ID
        WHERE
            Appointment.Appointment_ID = ?;
    `;

    db.query(query, [appointmentId], (err, results) => {
        if (err) {
            console.error('Error fetching tasks for appointment:', err);
            return res.status(500).send('Error fetching tasks for appointment.');
        }

        res.json(results);
    });
});

  return router;
};

