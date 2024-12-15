// Import necessary modules and components
import React from 'react'; // React core
import { Link } from 'react-router-dom'; // Link component for navigation
import '../../styling/VehiclesHome.css'; // Import the CSS file for styling

// VehiclesHome component definition
const VehiclesHome = () => {
    return (
        <div className="vehicles-home-container">
            <h1 className="title">Vehicle Management</h1>
            {/* Brief description of the vehicle management section */}
            <p className="description">
                Manage vehicle inventory and track customer-owned vehicles.
            </p>
            
            {/* Navigation links for vehicle-related actions */}
            <nav className="vehicles-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/vehicles/inventory" className="nav-link">
                            View Inventory
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vehicles/owned" className="nav-link">
                            View Customer Vehicles
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vehicles/add" className="nav-link">
                            Add Vehicle to Inventory
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vehicles/purchase" className="nav-link">
                            Assign Vehicle to Customer
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Export the VehiclesHome component as the default export
export default VehiclesHome;
