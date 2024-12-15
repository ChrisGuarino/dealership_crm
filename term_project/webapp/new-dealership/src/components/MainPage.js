// Import necessary modules and components
import React from 'react'; // React core
import { Link } from 'react-router-dom'; // Link component for navigation
import '../styling/MainPage.css'; // Import the CSS file for styling

// MainPage component definition
const MainPage = () => {
    return (
        <div className="main-page-container">
            <h1 className="title">Dealership Management</h1>
            {/* Brief introduction to the dealership management system */}
            <p className="description">
                Welcome to the Dealership Management System. 
                Choose a section below to get started.
            </p>
            
            {/* Navigation links for main sections */}
            <nav className="mainpage-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/customers" className="nav-link">
                            Customer Management
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vehicles" className="nav-link">
                            Vehicle Management
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service" className="nav-link">
                            Service Department
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sales" className="nav-link">
                            Sales Management
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Export the MainPage component as the default export
export default MainPage;
