// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { Link } from 'react-router-dom'; // Link component for navigation
import { fetchCustomers } from '../../api'; // API function to fetch customer list
import '../../styling/CustomersList.css'; // Import the CSS file for styling

// CustomersList component definition
const CustomersList = () => {
    // State to store the list of customers
    const [customers, setCustomers] = useState([]);

    // useEffect to fetch the customer list when the component mounts
    useEffect(() => {
        fetchCustomers() // Fetch customers from API
            .then((response) => setCustomers(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching customers:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div className="customers-list-container">
            <h1 className="title">Existing Customers</h1>
            <ul className="customers-list">
                {/* Check if there are customers and display them */}
                {customers.length > 0 ? (
                    customers.map((customer) => (
                        <li key={customer.Customer_ID} className="customer-item">
                            {/* Link to the detailed page of each customer */}
                            <Link
                                to={`/customers/${customer.Customer_ID}/details`}
                                className="customer-link"
                            >
                                {customer.F_Name} {customer.L_Name}
                            </Link>
                        </li>
                    ))
                ) : (
                    // Display a message if no customers are available
                    <p className="no-customers">No customers available.</p>
                )}
            </ul>
        </div>
    );
};

// Export the CustomersList component as the default export
export default CustomersList;
