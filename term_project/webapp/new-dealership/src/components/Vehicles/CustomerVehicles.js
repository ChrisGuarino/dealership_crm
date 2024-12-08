import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCustomerVehicles } from '../../api';
import '../../styling/CustomerVehicles.css';

const CustomerVehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching customer vehicles:', err));
    }, []);

    return (
        <div className="customer-vehicles-container">
            <h1 className="title">Customer Vehicles</h1>
            <ul className="vehicles-list">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle.Car_ID} className="vehicle-item">
                            <Link
                                to={`/vehicles/${vehicle.Car_ID}/details`}
                                className="vehicle-link"
                            >
                                {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}, Odometer: {vehicle.Odometer} miles
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="no-vehicles">No vehicles owned by customers.</p>
                )}
            </ul>
        </div>
    );
};

export default CustomerVehicles;
