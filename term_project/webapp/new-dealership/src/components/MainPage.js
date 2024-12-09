import React from 'react';
import { Link } from 'react-router-dom';
import '../styling/MainPage.css';

const MainPage = () => {
    return (
        <div className="main-page-container">
            <h1 className="title">Dealership Management</h1>
            <p className="description">
                Welcome to the Dealership Management System. 
                Choose a section below to get started.
            </p>
            
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

export default MainPage;
