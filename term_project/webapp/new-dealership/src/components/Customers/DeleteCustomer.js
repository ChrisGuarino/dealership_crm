import React, { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../../api';
import { useNavigate } from 'react-router-dom';

const DeleteCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();

    // Fetch all customers when the component mounts
    useEffect(() => {
        fetchCustomers()
            .then((response) => {
                setCustomers(response.data);
            })
            .catch((err) => {
                console.error('Error fetching customers:', err);
            });
    }, []);

    // Handle customer deletion
    const handleDelete = (customerId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
        if (confirmDelete) {
            deleteCustomer(customerId)
                .then(() => {
                    setCustomers(customers.filter((customer) => customer.Customer_ID !== customerId));
                    alert('Customer deleted successfully!');
                })
                .catch((err) => {
                    console.error('Error deleting customer:', err);
                });
        }
    };

    // Navigate back to CustomersHome
    const goBack = () => {
        navigate('/customers');
    };

    return (
        <div>
            <h1>Delete a Customer</h1>
            <p>Select a customer from the list below to delete them from the database.</p>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.Customer_ID}>
                        {customer.F_Name} {customer.L_Name} - {customer.Email}
                        <button
                            onClick={() => handleDelete(customer.Customer_ID)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={goBack} style={{ marginTop: '20px' }}>Back to Customer Management</button>
        </div>
    );
};

export default DeleteCustomer;
