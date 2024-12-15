// Import necessary modules and components
import React from 'react'; // React core
import { Link } from 'react-router-dom'; // Link component for navigation
import '../../styling/ServiceHome.css'; // Import the CSS file for styling

// ServiceHome component definition
const ServiceHome = () => {
    return (
        <div className="service-home-container">
            <h1 className="title">Service Department</h1>
            {/* Brief description of the service department */}
            <p className="description">
                Manage service appointments, packages, and parts inventory.
            </p>
            
            {/* Navigation links for service-related actions */}
            <nav className="service-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/service/appointments" className="nav-link">
                            View Appointments
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service/add-appointment" className="nav-link">
                            Add Appointment
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service/packages" className="nav-link">
                            View Service Packages
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service/parts" className="nav-link">
                            View Parts
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/service/was_performed" className="nav-link">
                            Log Performed Tasks
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Export the ServiceHome component as the default export
export default ServiceHome;
