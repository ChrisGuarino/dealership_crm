// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { Link } from 'react-router-dom'; // Link component for navigation
import { fetchCustomerVehicles } from '../../api'; // API function to fetch customer vehicles
import '../../styling/CustomerVehicles.css'; // Import the CSS file for styling

// CustomerVehicles component definition
const CustomerVehicles = () => {
    // State to store the list of customer vehicles
    const [vehicles, setVehicles] = useState([]);

    // useEffect to fetch customer vehicles when the component mounts
    useEffect(() => {
        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data)) // Update state with fetched vehicles
            .catch((err) => console.error('Error fetching customer vehicles:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    // Render the list of customer vehicles
    return (
        <div className="customer-vehicles-container">
            <h1 className="title">Customer Vehicles</h1>
            <ul className="vehicles-list">
                {/* Check if there are vehicles and display them */}
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle.Car_ID} className="vehicle-item">
                            {/* Link to the detailed page of each vehicle */}
                            <Link
                                to={`/vehicles/${vehicle.Car_ID}/details`}
                                className="vehicle-link"
                            >
                                {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}, Odometer: {vehicle.Odometer} miles
                            </Link>
                        </li>
                    ))
                ) : (
                    // Display a message if no vehicles are owned by customers
                    <p className="no-vehicles">No vehicles owned by customers.</p>
                )}
            </ul>
        </div>
    );
};

// Export the CustomerVehicles component as the default export
export default CustomerVehicles;
