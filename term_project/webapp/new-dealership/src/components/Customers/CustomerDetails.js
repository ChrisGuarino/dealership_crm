// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { useParams } from 'react-router-dom'; // Hook to retrieve route parameters
import { fetchCustomerDetails } from '../../api'; // API function to fetch customer details
import '../../styling/CustomerDetails.css'; // Import the CSS file for styling

// CustomerDetails component definition
const CustomerDetails = () => {
    // Extract the customerId from the route parameters
    const { customerId } = useParams(); 
    
    // State to store the fetched customer details
    const [customer, setCustomer] = useState(null);

    // useEffect to fetch customer details when the component mounts or customerId changes
    useEffect(() => {
        fetchCustomerDetails(customerId) // Fetch customer details from API
            .then((response) => setCustomer(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching customer details:', err)); // Handle errors
    }, [customerId]); // Dependency array ensures effect runs when customerId changes

    // Display loading text if customer data is not yet fetched
    if (!customer) {
        return <p className="loading-text">Loading customer details...</p>;
    }

    // Render customer details once data is available
    return (
        <div className="customer-details-container">
            <h1 className="title">Customer Details</h1>
            {/* Display basic customer information */}
            <div className="customer-info">
                <p><strong>Name:</strong> {customer.F_Name} {customer.M_Init || ''} {customer.L_Name}</p>
                <p><strong>Phone:</strong> {customer.Phone}</p>
                <p><strong>Email:</strong> {customer.Email}</p>
                <p><strong>Address:</strong> {customer.Address}</p>
            </div>

            {/* Display the list of cars owned by the customer */}
            <div className="customer-cars">
                <h2>Cars Owned</h2>
                <ul>
                    {customer.Cars_Owned // Check if cars are available
                        ? customer.Cars_Owned.split(', ').map((car, index) => (
                            <li key={index}>{car}</li> // Render each car as a list item
                          ))
                        : <li>None</li>} {/* Display "None" if no cars are owned */}
                </ul>
            </div>

            {/* Display the spending summary of the customer */}
            <div className="customer-spending">
                <h2>Spending Summary</h2>
                <p><strong>Total Spent on Purchases:</strong> ${customer.Total_Purchases || 0}</p>
                <p><strong>Total Spent on Services:</strong> ${customer.Total_Service_Cost || 0}</p>
                <p><strong>Total Spent at Dealership:</strong> ${customer.Total_Spent || 0}</p>
            </div>
        </div>
    );
};

// Export the CustomerDetails component as the default export
export default CustomerDetails;
