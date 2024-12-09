import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/CustomersHome.css';

const CustomersHome = () => {
    return (
        <div className="customers-home">
            <h1 className="title">Customer Management</h1>
            <p className="description">
                Manage customer information, view their vehicles, and track purchases.
            </p>

            <nav className="customers-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/customers/add" className="nav-link">Add New Customer</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/customers/list" className="nav-link">View Existing Customers</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default CustomersHome;
