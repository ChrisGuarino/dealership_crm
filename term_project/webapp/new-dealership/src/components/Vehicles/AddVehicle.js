import React, { useState } from 'react';
import { addVehicleToInventory } from '../../api';

const AddVehicle = () => {
    const [vehicle, setVehicle] = useState({
        Make: '',
        Model: '',
        Year: '',
        Tire_Type: '',
        Engine_Type: '',
        Interior: '',
        Odometer: '',
        Color: '',
        Cost: '',
    });
    const colors = ['Red', 'Blue', 'Black', 'White', 'Gray', 'Silver'];
    const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addVehicleToInventory(vehicle)
            .then(() => {
                alert('Vehicle added to inventory successfully!');
                setVehicle({
                    Make: '',
                    Model: '',
                    Year: '',
                    Tire_Type: '',
                    Engine_Type: '',
                    Interior: '',
                    Odometer: '',
                    Color: '',
                    Cost: '',
                });
            })
            .catch((err) => console.error('Error adding vehicle:', err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Vehicle to Inventory</h1>
            <input
                type="text"
                name="Make"
                value={vehicle.Make}
                onChange={handleChange}
                placeholder="Make"
                required
            />
            <input
                type="text"
                name="Model"
                value={vehicle.Model}
                onChange={handleChange}
                placeholder="Model"
                required
            />
            <input
                type="text"
                name="Tire_Type"
                value={vehicle.Tire_Type}
                onChange={handleChange}
                placeholder="Tire Type"
                required
            />
            <input
                type="text"
                name="Interior"
                value={vehicle.Interior}
                onChange={handleChange}
                placeholder="Interior"
                required
            />
            <input
                type="number"
                name="Odometer"
                value={vehicle.Odometer}
                onChange={handleChange}
                placeholder="Odometer"
                required
            />
            <select
                name="Color"
                value={vehicle.Color}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                    Select Color
                </option>
                {colors.map((color) => (
                    <option key={color} value={color}>
                        {color}
                    </option>
                ))}
            </select>
            <select
                name="Year"
                value={vehicle.Year}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                    Select Year
                </option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            <input
                type="number"
                name="Cost"
                value={vehicle.Cost}
                onChange={handleChange}
                placeholder="Cost"
                required
            />
            <input
                type="text"
                name="Engine_Type"
                value={vehicle.Engine_Type}
                onChange={handleChange}
                placeholder="Engine Type"
                required
            />
            <button type="submit">Add Vehicle</button>
        </form>
    );
};

export default AddVehicle;
