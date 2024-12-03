import React from 'react';
import { Link } from 'react-router-dom';

const SalesHome = () => {
    return (
        <div>
            <h1>Sales Management</h1>
            <p>Manage sales information,track purchases, and sales history.</p>
            
            <nav>
                <ul>
                    <li><Link to="/sales/purchases">View Purchases</Link></li>
                    <li><Link to="/sales/stats">View Stats</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default SalesHome;
