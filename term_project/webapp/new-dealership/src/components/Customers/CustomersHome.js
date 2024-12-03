import React from 'react';
import { Link } from 'react-router-dom';

const CustomersHome = () => {
    return (
        <div>
            <h1>Customer Management</h1>
            <p>Manage customer information, view their vehicles, and track purchases.</p>
            
            <nav>
                <ul>
                    <li><Link to="/customers/add">Add New Customer</Link></li>
                    <li><Link to="/customers/list">View Existing Customers</Link></li>
                    <li><Link to="/customers/delete">Delete a Customer</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default CustomersHome;
