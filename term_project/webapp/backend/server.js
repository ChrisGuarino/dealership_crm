// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Route handlers
const vehicleRoutes = require("./routes/vehicles")(db);
const customerRoutes = require("./routes/customers")(db);
const serviceRoutes = require("./routes/service")(db);
const salesRoutes = require("./routes/sales")(db);

// Use routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/sales", salesRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
