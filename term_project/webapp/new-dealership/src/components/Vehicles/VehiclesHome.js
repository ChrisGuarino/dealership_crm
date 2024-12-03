import React from 'react';
import { Link } from 'react-router-dom';

const VehiclesHome = () => {
    return (
        <div>
            <h1>Vehicle Management</h1>
            <p>Manage vehicle inventory and track customer-owned vehicles.</p>
            
            <nav>
                <ul>
                    <li><Link to="/vehicles/inventory">View Inventory</Link></li>
                    <li><Link to="/vehicles/owned">View Customer Vehicles</Link></li>
                    <li><Link to="/vehicles/add">Add Vehicle to Inventory</Link></li>
                    <li><Link to="/vehicles/delete">Delete Vehicle from Inventory</Link></li>
                    <li><Link to="/vehicles/purchase">Assign Vehicle to Customer</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default VehiclesHome;
