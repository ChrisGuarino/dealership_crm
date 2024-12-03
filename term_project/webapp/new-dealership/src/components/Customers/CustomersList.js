import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomers } from '../../api';

const CustomersList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers()
            .then((response) => setCustomers(response.data))
            .catch((err) => console.error('Error fetching customers:', err));
    }, []);

    return (
        <div>
            <h1>Existing Customers</h1>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.Customer_ID}>
                        <Link to={`/customers/${customer.Customer_ID}/details`}>
                            {customer.F_Name} {customer.L_Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomersList;
