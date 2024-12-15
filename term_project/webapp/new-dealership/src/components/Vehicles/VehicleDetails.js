// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { useParams } from 'react-router-dom'; // Hook to retrieve route parameters
import { fetchVehicleDetails } from '../../api'; // API function to fetch vehicle details
import '../../styling/VehicleDetails.css'; // Import the CSS file for styling

// VehicleDetails component definition
const VehicleDetails = () => {
    // Extract the carId from the route parameters
    const { carId } = useParams();

    // State to store fetched vehicle details
    const [vehicle, setVehicle] = useState(null);

    // useEffect to fetch vehicle details when the component mounts or carId changes
    useEffect(() => {
        fetchVehicleDetails(carId)
            .then((response) => setVehicle(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching vehicle details:', err)); // Handle errors
    }, [carId]); // Dependency array ensures effect runs when carId changes

    // If vehicle details are not yet loaded, display a loading message
    if (!vehicle) {
        return <p className="loading-text">Loading vehicle details...</p>;
    }

    // Render vehicle details
    return (
        <div className="vehicle-details-container">
            <h1 className="title">Vehicle Details</h1>
            <div className="vehicle-info">
                <p><strong>Car ID:</strong> {vehicle.Car_ID}</p>
                <p><strong>Interior:</strong> {vehicle.Interior}</p>
                <p><strong>Odometer:</strong> {vehicle.Odometer} miles</p>
                <p><strong>Color:</strong> {vehicle.Color}</p>
                <p><strong>Make:</strong> {vehicle.Make}</p>
                <p><strong>Model:</strong> {vehicle.Model}</p>
                <p><strong>Year:</strong> {vehicle.Year}</p>
                <p><strong>Tire Type:</strong> {vehicle.Tire_Type}</p>
                <p><strong>Engine Type:</strong> {vehicle.Engine_Type}</p>
                <p><strong>Dealership Cost:</strong> ${vehicle.Cost}</p>
            </div>
        </div>
    );
};

// Export the VehicleDetails component as the default export
export default VehicleDetails;
