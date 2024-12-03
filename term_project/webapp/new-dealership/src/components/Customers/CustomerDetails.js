import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCustomerDetails } from '../../api';

const CustomerDetails = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        fetchCustomerDetails(customerId)
            .then((response) => setCustomer(response.data))
            .catch((err) => console.error('Error fetching customer details:', err));
    }, [customerId]);

    if (!customer) {
        return <p>Loading customer details...</p>;
    }

    return (
        <div>
            <h1>Customer Details</h1>
            <p><strong>Name:</strong> {customer.F_Name} {customer.M_Init || ''} {customer.L_Name}</p>
            <p><strong>Phone:</strong> {customer.Phone}</p>
            <p><strong>Email:</strong> {customer.Email}</p>
            <p><strong>Address:</strong> {customer.Address}</p>
            <p><strong>Cars Owned:</strong></p>
            <ul>
                {customer.Cars_Owned 
                    ? customer.Cars_Owned.split(', ').map((car, index) => (
                        <li key={index}>{car}</li>
                      ))
                    : <li>None</li>
                }
            </ul>
            <p><strong>Total Spent on Purchases:</strong> ${customer.Total_Purchases || 0}</p>
            <p><strong>Total Spent on Services:</strong> ${customer.Total_Service_Cost || 0}</p>
            <p><strong>Total Spent at Dealership:</strong> ${customer.Total_Spent || 0}</p>
        </div>
    );
};

export default CustomerDetails;
