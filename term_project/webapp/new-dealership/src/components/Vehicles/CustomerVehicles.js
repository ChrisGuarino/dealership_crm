import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomerVehicles } from '../../api';

const CustomerVehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching customer vehicles:', err));
    }, []);

    return (
        <div>
            <h1>Customer Vehicles</h1>
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.Car_ID}>
                        <Link to={`/vehicles/${vehicle.Car_ID}/details`}>
                            {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}, Odometer: {vehicle.Odometer} miles
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerVehicles;
