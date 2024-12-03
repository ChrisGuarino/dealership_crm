import React from 'react';
import { Link } from 'react-router-dom';

const ServiceHome = () => {
    return (
        <div>
            <h1>Service Department</h1>
            <p>Manage service appointments, packages, and parts inventory.</p>
            
            <nav>
                <ul>
                    <li><Link to="/service/appointments">View Appointments</Link></li>
                    <li><Link to="/service/add-appointment">Add Appointment</Link></li>
                    <li><Link to="/service/delete-appointment">Delete Appointment</Link></li>
                    <li><Link to="/service/packages">View Service Packages</Link></li>
                    <li><Link to="/service/parts">View Parts</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default ServiceHome;
