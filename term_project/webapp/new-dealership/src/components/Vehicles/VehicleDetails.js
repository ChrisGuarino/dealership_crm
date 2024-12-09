import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVehicleDetails } from '../../api';
import '../../styling/VehicleDetails.css';

const VehicleDetails = () => {
    const { carId } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetchVehicleDetails(carId)
            .then((response) => setVehicle(response.data))
            .catch((err) => console.error('Error fetching vehicle details:', err));
    }, [carId]);

    if (!vehicle) {
        return <p className="loading-text">Loading vehicle details...</p>;
    }

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

export default VehicleDetails;
