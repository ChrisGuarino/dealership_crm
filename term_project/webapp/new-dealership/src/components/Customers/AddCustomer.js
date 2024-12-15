// Import necessary modules and components
import React, { useState } from 'react'; // React core and useState hook for state management
import { createCustomer } from '../../api'; // API function to create a new customer
import '../../styling/AddCustomer.css'; // Import the CSS file for styling

// AddCustomer component definition
const AddCustomer = () => {
    // State to manage customer form input values
    const [customer, setCustomer] = useState({
        F_Name: '', // First Name
        L_Name: '', // Last Name
        Phone: '', // Phone Number
        Email: '', // Email Address
        Address: '', // Address
    });

    // Handle input changes for the form fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure field name and value from the event
        // Update the customer state object with the new value
        setCustomer({ ...customer, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Call the API to create a new customer
        createCustomer(customer)
            .then(() => alert('Customer added successfully!')) // Show success alert
            .catch((err) => console.error('Error adding customer:', err)); // Log any errors
    };

    // Render the Add Customer form
    return (
        <div className="add-customer-container">
            <h1 className="title">Add New Customer</h1>
            <form className="add-customer-form" onSubmit={handleSubmit}>
                {/* First Name Field */}
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
                {/* Last Name Field */}
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
                {/* Phone Field */}
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
                {/* Email Field */}
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
                {/* Address Field */}
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
                {/* Submit Button */}
                <button className="submit-button" type="submit">Add Customer</button>
            </form>
        </div>
    );
};

// Export the AddCustomer component as the default export
export default AddCustomer;
