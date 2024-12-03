import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVehicleDetails } from '../../api';

const VehicleDetails = () => {
    const { carId } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        fetchVehicleDetails(carId)
            .then((response) => setVehicle(response.data))
            .catch((err) => console.error('Error fetching vehicle details:', err));
    }, [carId]);

    if (!vehicle) {
        return <p>Loading vehicle details...</p>;
    }

    return (
        <div>
            <h1>Vehicle Details</h1>
            <p><strong>Car ID:</strong> {vehicle.Car_ID}</p>
            <p><strong>Interior:</strong> {vehicle.Interior}</p>
            <p><strong>Odometer:</strong> {vehicle.Odometer} miles</p>
            <p><strong>Color:</strong> {vehicle.Color}</p>
            <p><strong>Make:</strong> {vehicle.Make}</p>
            <p><strong>Model:</strong> {vehicle.Model}</p>
            <p><strong>Year:</strong> {vehicle.Year}</p>
            <p><strong>Tire Type:</strong> {vehicle.Tire_Type}</p>
            <p><strong>Engine Type:</strong> {vehicle.Engine_Type}</p>
        </div>
    );
};

export default VehicleDetails;
