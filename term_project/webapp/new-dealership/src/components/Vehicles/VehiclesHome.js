import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/VehiclesHome.css';

const VehiclesHome = () => {
    return (
        <div className="vehicles-home-container">
            <h1 className="title">Vehicle Management</h1>
            <p className="description">
                Manage vehicle inventory and track customer-owned vehicles.
            </p>
            
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
                        <Link to="/vehicles/delete" className="nav-link">
                            Delete Vehicle from Inventory
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

export default VehiclesHome;
