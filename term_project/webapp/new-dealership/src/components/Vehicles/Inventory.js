// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { Link } from 'react-router-dom'; // Link component for navigation
import { fetchVehiclesInInventory } from '../../api'; // API function to fetch inventory vehicles
import '../../styling/Inventory.css'; // Import the CSS file for styling

// Inventory component definition
const Inventory = () => {
    // State to store the list of inventory vehicles
    const [vehicles, setVehicles] = useState([]);

    // useEffect to fetch inventory vehicles when the component mounts
    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data)) // Update state with fetched vehicles
            .catch((err) => console.error('Error fetching inventory vehicles:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    // Render the list of inventory vehicles
    return (
        <div className="inventory-container">
            <h1 className="title">Vehicles in Inventory</h1>
            <ul className="inventory-list">
                {/* Check if there are vehicles and display them */}
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle.Car_ID} className="inventory-item">
                            {/* Link to the detailed page of each vehicle */}
                            <Link
                                to={`/vehicles/${vehicle.Car_ID}/details`}
                                className="vehicle-link"
                            >
                                {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}
                            </Link>
                        </li>
                    ))
                ) : (
                    // Display a message if no vehicles are available in inventory
                    <p className="no-vehicles">No vehicles in inventory.</p>
                )}
            </ul>
        </div>
    );
};

// Export the Inventory component as the default export
export default Inventory;
