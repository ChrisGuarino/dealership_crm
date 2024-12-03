import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchVehiclesInInventory } from '../../api';

const Inventory = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching inventory vehicles:', err));
    }, []);

    return (
        <div>
            <h1>Vehicles in Inventory</h1>
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.Car_ID}>
                        <Link to={`/vehicles/${vehicle.Car_ID}/details`}>
                            {vehicle.Make} {vehicle.Model} ({vehicle.Year}) - {vehicle.Color}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
