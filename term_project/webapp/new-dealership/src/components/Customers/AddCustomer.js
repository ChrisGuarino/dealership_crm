import React, { useState } from 'react';
import { createCustomer } from '../../api';
import '../../styling/AddCustomer.css';

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
        <div className="add-customer-container">
            <h1 className="title">Add New Customer</h1>
            <form className="add-customer-form" onSubmit={handleSubmit}>
                <label className="form-label">
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
                <label className="form-label">
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
                <label className="form-label">
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
                <label className="form-label">
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
                <label className="form-label">
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
                <button className="submit-button" type="submit">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
