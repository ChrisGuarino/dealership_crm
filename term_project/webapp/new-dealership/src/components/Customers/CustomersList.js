import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomers } from '../../api';
import '../../styling/CustomersList.css';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
            .then((response) => setCustomers(response.data))
            .catch((err) => console.error('Error fetching customers:', err));
    }, []);

    return (
        <div className="customers-list-container">
            <h1 className="title">Existing Customers</h1>
            <ul className="customers-list">
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <li key={customer.Customer_ID} className="customer-item">
                            <Link
                                to={`/customers/${customer.Customer_ID}/details`}
                                className="customer-link"
                            >
                                {customer.F_Name} {customer.L_Name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="no-customers">No customers available.</p>
                )}
            </ul>
        </div>
    );
};

export default CustomersList;
