import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVehiclesInInventory } from '../../api';
import '../../styling/Inventory.css';

const Inventory = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching inventory vehicles:', err));
    }, []);

    return (
        <div className="inventory-container">
            <h1 className="title">Vehicles in Inventory</h1>
            <ul className="inventory-list">
                {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                        <li key={vehicle.Car_ID} className="inventory-item">
                            <Link
                                to={`/vehicles/${vehicle.Car_ID}/details`}
                                className="vehicle-link"
                            >
                                {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="no-vehicles">No vehicles in inventory.</p>
                )}
            </ul>
        </div>
    );
};

export default Inventory;
