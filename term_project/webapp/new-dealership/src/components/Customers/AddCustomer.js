import React, { useState } from 'react';
import { createCustomer } from '../../api';

const AddCustomer = () => {
    const [customer, setCustomer] = useState({
        F_Name: '',
        L_Name: '',
        Phone: '',
        Email: '',
        Address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCustomer(customer)
            .then(() => alert('Customer added successfully!'))
            .catch((err) => console.error('Error adding customer:', err));
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
    <label>
        <span>First Name:</span>
        <input
            type="text"
            name="F_Name"
            value={customer.F_Name}
            onChange={handleChange}
            placeholder="First Name"
            required
        />
    </label>
    <label>
        <span>Last Name:</span>
        <input
            type="text"
            name="L_Name"
            value={customer.L_Name}
            onChange={handleChange}
            placeholder="Last Name"
            required
        />
    </label>
    <label>
        <span>Phone:</span>
        <input
            type="text"
            name="Phone"
            value={customer.Phone}
            onChange={handleChange}
            placeholder="Phone"
            required
        />
    </label>
    <label>
        <span>Email:</span>
        <input
            type="email"
            name="Email"
            value={customer.Email}
            onChange={handleChange}
            placeholder="Email"
            required
        />
    </label>
    <label>
        <span>Address:</span>
        <input
            type="text"
            name="Address"
            value={customer.Address}
            onChange={handleChange}
            placeholder="Address"
            required
        />
    </label>
    <button type="submit">Add Customer</button>
</form>
    );
};

export default AddCustomer;
