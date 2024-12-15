// Import required modules
const express = require("express"); // Express framework for building APIs
const cors = require("cors"); // Middleware for Cross-Origin Resource Sharing
const dotenv = require("dotenv"); // Environment variable management
const mysql = require("mysql2"); // MySQL client for database interaction

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an Express application

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST, // Database host
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name
  port: process.env.DB_PORT, // Database port
});

// Import and set up route handlers
const vehicleRoutes = require("./routes/vehicles")(db); // Vehicle routes
const customerRoutes = require("./routes/customers")(db); // Customer routes
const serviceRoutes = require("./routes/service")(db); // Service routes
const salesRoutes = require("./routes/sales")(db); // Sales routes

// Attach route handlers to specific endpoints
app.use("/api/vehicles", vehicleRoutes); // Routes for vehicles
app.use("/api/customers", customerRoutes); // Routes for customers
app.use("/api/service", serviceRoutes); // Routes for service
app.use("/api/sales", salesRoutes); // Routes for sales

// Start the server on the specified port
const PORT = process.env.PORT || 5001; // Fallback to port 5001 if not specified
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log the running server
});
