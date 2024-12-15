// Import necessary modules and components
import React, { useState } from 'react'; // React core and hooks
import { addVehicleToInventory } from '../../api'; // API function to add a vehicle to inventory
import '../../styling/AddVehicle.css'; // Import the CSS file for styling

// AddVehicle component definition
const AddVehicle = () => {
    // State to store form data for the vehicle being added
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

    // Predefined lists for colors and years
    const colors = ['Red', 'Blue', 'Black', 'White', 'Gray', 'Silver'];
    const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() - i).toString());

    // Handle changes in form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addVehicleToInventory(vehicle) // Call the API to add the vehicle
            .then(() => {
                alert('Vehicle added to inventory successfully!'); // Show success message
                // Reset form fields
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
            .catch((err) => console.error('Error adding vehicle:', err)); // Handle errors
    };

    // Render the form for adding a vehicle
    return (
        <div className="add-vehicle-container">
            <h1 className="title">Add Vehicle to Inventory</h1>
            <form className="add-vehicle-form" onSubmit={handleSubmit}>
                {/* Form fields for vehicle details */}
                <label className="form-label">
                    Make:
                    <input
                        type="text"
                        name="Make"
                        value={vehicle.Make}
                        onChange={handleChange}
                        placeholder="Make"
                        required
                    />
                </label>
                <label className="form-label">
                    Model:
                    <input
                        type="text"
                        name="Model"
                        value={vehicle.Model}
                        onChange={handleChange}
                        placeholder="Model"
                        required
                    />
                </label>
                <label className="form-label">
                    Tire Type:
                    <input
                        type="text"
                        name="Tire_Type"
                        value={vehicle.Tire_Type}
                        onChange={handleChange}
                        placeholder="Tire Type"
                        required
                    />
                </label>
                <label className="form-label">
                    Interior:
                    <input
                        type="text"
                        name="Interior"
                        value={vehicle.Interior}
                        onChange={handleChange}
                        placeholder="Interior"
                        required
                    />
                </label>
                <label className="form-label">
                    Odometer:
                    <input
                        type="number"
                        name="Odometer"
                        value={vehicle.Odometer}
                        onChange={handleChange}
                        placeholder="Odometer"
                        required
                    />
                </label>
                <label className="form-label">
                    Color:
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
                </label>
                <label className="form-label">
                    Year:
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
                </label>
                <label className="form-label">
                    Cost:
                    <input
                        type="number"
                        name="Cost"
                        value={vehicle.Cost}
                        onChange={handleChange}
                        placeholder="Cost"
                        required
                    />
                </label>
                <label className="form-label">
                    Engine Type:
                    <input
                        type="text"
                        name="Engine_Type"
                        value={vehicle.Engine_Type}
                        onChange={handleChange}
                        placeholder="Engine Type"
                        required
                    />
                </label>
                <button className="submit-button" type="submit">Add Vehicle</button>
            </form>
        </div>
    );
};

// Export the AddVehicle component as the default export
export default AddVehicle;
