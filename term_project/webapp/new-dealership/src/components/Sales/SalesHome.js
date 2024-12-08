import React from 'react';
import { Link } from 'react-router-dom';
import '../../styling/SalesHome.css';

const SalesHome = () => {
    return (
        <div className="sales-home-container">
            <h1 className="title">Sales Management</h1>
            <p className="description">
                Manage sales information, track purchases, and review sales history.
            </p>

            <nav className="sales-nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/sales/purchases" className="nav-link">
                            View Purchases
                        </Link>
                    </li>
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

export default SalesHome;
