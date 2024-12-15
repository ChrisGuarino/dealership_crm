// Import necessary modules and components
import React from 'react'; // React core
import { Link } from 'react-router-dom'; // Link component for navigation
import '../../styling/SalesHome.css'; // Import the CSS file for styling

// SalesHome component definition
const SalesHome = () => {
    return (
        <div className="sales-home-container">
            <h1 className="title">Sales Management</h1>
            {/* Brief description of the sales management section */}
            <p className="description">
                Manage sales information, track purchases, and review sales history.
            </p>

            {/* Navigation links for sales management actions */}
            <nav className="sales-nav">
                <ul className="nav-list">
                    {/* Link to view all purchases */}
                    <li className="nav-item">
                        <Link to="/sales/purchases" className="nav-link">
                            View Purchases
                        </Link>
                    </li>
                    {/* Link to view sales statistics */}
                    <li className="nav-item">
                        <Link to="/sales/stats" className="nav-link">
                            View Stats
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Export the SalesHome component as the default export
export default SalesHome;
