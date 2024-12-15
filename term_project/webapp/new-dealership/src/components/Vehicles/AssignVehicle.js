// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { fetchVehiclesInInventory, fetchCustomers, assignVehicleToCustomer } from '../../api'; // API functions
import '../../styling/AssignVehicle.css'; // Import the CSS file for styling

// AssignVehicle component definition
const AssignVehicle = () => {
    // State to store the list of vehicles and customers
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);

    // State to store form data
    const [form, setForm] = useState({
        Car_ID: '',
        Customer_ID: '',
        Date_Of_Purchase: '',
        Sale_Price: '',
        License_Plate_State: '',
        License_Plate: '',
    });

    // List of U.S. states for license plate selection
    const states = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
    ];

    // Fetch vehicles and customers when the component mounts
    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data)) // Update vehicles state
            .catch((err) => console.error('Error fetching vehicles:', err)); // Handle errors

        fetchCustomers()
            .then((response) => setCustomers(response.data)) // Update customers state
            .catch((err) => console.error('Error fetching customers:', err)); // Handle errors
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        assignVehicleToCustomer(form) // Call API to assign vehicle to a customer
            .then(() => {
                alert('Vehicle successfully assigned to customer!'); // Show success message
                // Reset form fields
                setForm({
                    Car_ID: '',
                    Customer_ID: '',
                    Date_Of_Purchase: '',
                    Sale_Price: '',
                    License_Plate_State: '',
                    License_Plate: '',
                });
            })
            .catch((err) => console.error('Error assigning vehicle:', err)); // Handle errors
    };

    // Render the form to assign a vehicle to a customer
    return (
        <div className="assign-vehicle-container">
            <h1 className="title">Assign Vehicle to Customer</h1>
            <form className="assign-vehicle-form" onSubmit={handleSubmit}>
                {/* Dropdown for selecting a vehicle */}
                <label className="form-label">
                    Select Vehicle:
                    <select name="Car_ID" value={form.Car_ID} onChange={handleChange} required>
                        <option value="">-- Select a Vehicle --</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.Car_ID} value={vehicle.Car_ID}>
                                {vehicle.Color} {vehicle.Make} {vehicle.Model} (ID: {vehicle.Car_ID})
                            </option>
                        ))}
                    </select>
                </label>

                {/* Dropdown for selecting a customer */}
                <label className="form-label">
                    Select Customer:
                    <select name="Customer_ID" value={form.Customer_ID} onChange={handleChange} required>
                        <option value="">-- Select a Customer --</option>
                        {customers.map((customer) => (
                            <option key={customer.Customer_ID} value={customer.Customer_ID}>
                                {customer.F_Name} {customer.L_Name} (ID: {customer.Customer_ID})
                            </option>
                        ))}
                    </select>
                </label>

                {/* Input for purchase date */}
                <label className="form-label">
                    Purchase Date:
                    <input
                        type="date"
                        name="Date_Of_Purchase"
                        value={form.Date_Of_Purchase}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Input for sale price */}
                <label className="form-label">
                    Sale Price:
                    <input
                        type="number"
                        name="Sale_Price"
                        value={form.Sale_Price}
                        onChange={handleChange}
                        step="0.01"
                        placeholder="Enter sale price"
                        required
                    />
                </label>

                {/* Dropdown for selecting license plate state */}
                <label className="form-label">
                    License Plate State:
                    <select name="License_Plate_State" value={form.License_Plate_State} onChange={handleChange} required>
                        <option value="">-- Select a State --</option>
                        {states.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </label>

                {/* Input for license plate number */}
                <label className="form-label">
                    License Plate Number:
                    <input
                        type="text"
                        name="License_Plate"
                        value={form.License_Plate}
                        onChange={handleChange}
                        placeholder="Enter license plate number"
                        required
                    />
                </label>

                {/* Submit button */}
                <button className="submit-button" type="submit">Assign Vehicle</button>
            </form>
        </div>
    );
};

// Export the AssignVehicle component as the default export
export default AssignVehicle;
