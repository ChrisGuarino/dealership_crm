import React, { useEffect, useState } from 'react';
import { fetchVehiclesInInventory, deleteVehicleFromInventory } from '../../api';

const DeleteVehicle = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching vehicles:', err));
    }, []);

    const handleDelete = (carId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
        if (confirmDelete) {
            deleteVehicleFromInventory(carId)
                .then(() => {
                    setVehicles(vehicles.filter((vehicle) => vehicle.Car_ID !== carId));
                    alert('Vehicle deleted successfully!');
                })
                .catch((err) => console.error('Error deleting vehicle:', err));
        }
    };

    return (
        <div>
            <h1>Delete Vehicle from Inventory</h1>
            <ul>
                {vehicles.map((vehicle) => (
                    <li key={vehicle.Car_ID}>
                        Vehicle #{vehicle.Car_ID} - {vehicle.Color} - {vehicle.Interior}
                        <button
                            onClick={() => handleDelete(vehicle.Car_ID)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteVehicle;
