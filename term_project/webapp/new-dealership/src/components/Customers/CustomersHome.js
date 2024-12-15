// Import necessary modules and components
import React from 'react'; // React core
import { Link } from 'react-router-dom'; // Link component for navigation
import '../../styling/CustomersHome.css'; // Import the CSS file for styling

// CustomersHome component definition
const CustomersHome = () => {
    return (
        <div className="customers-home">
            <h1 className="title">Customer Management</h1>
            {/* Brief description of the customer management section */}
            <p className="description">
                Manage customer information, view their vehicles, and track purchases.
            </p>

            {/* Navigation links for customer management actions */}
            <nav className="customers-nav">
                <ul className="nav-list">
                    {/* Link to add a new customer */}
                    <li className="nav-item">
                        <Link to="/customers/add" className="nav-link">Add New Customer</Link>
                    </li>
                    {/* Link to view existing customers */}
                    <li className="nav-item">
                        <Link to="/customers/list" className="nav-link">View Existing Customers</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Export the CustomersHome component as the default export
export default CustomersHome;
