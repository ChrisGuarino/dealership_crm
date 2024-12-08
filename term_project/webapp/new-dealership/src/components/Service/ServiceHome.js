import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/ServiceHome.css';

const ServiceHome = () => {
    return (
        <div className="service-home-container">
            <h1 className="title">Service Department</h1>
            <p className="description">
                Manage service appointments, packages, and parts inventory.
            </p>
            
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
                        <Link to="/service/delete-appointment" className="nav-link">
                            Delete Appointment
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

export default ServiceHome;
