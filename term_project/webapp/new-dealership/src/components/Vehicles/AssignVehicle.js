import React, { useEffect, useState } from 'react';
import { fetchVehiclesInInventory, fetchCustomers, assignVehicleToCustomer } from '../../api';
import '../../styling/AssignVehicle.css';

const AssignVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [form, setForm] = useState({
        Car_ID: '',
        Customer_ID: '',
        Date_Of_Purchase: '',
        Sale_Price: '',
    });

    // Fetch vehicles and customers when the component mounts
    useEffect(() => {
        fetchVehiclesInInventory()
            .then((response) => setVehicles(response.data))
            .catch((err) => console.error('Error fetching vehicles:', err));

        fetchCustomers()
            .then((response) => setCustomers(response.data))
            .catch((err) => console.error('Error fetching customers:', err));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        assignVehicleToCustomer(form)
            .then(() => {
                alert('Vehicle successfully assigned to customer!');
                setForm({ Car_ID: '', Customer_ID: '', Date_Of_Purchase: '', Sale_Price: '' });
            })
            .catch((err) => console.error('Error assigning vehicle:', err));
    };

    return (
        <div className="assign-vehicle-container">
            <h1 className="title">Assign Vehicle to Customer</h1>
            <form className="assign-vehicle-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Select Vehicle:
                    <select name="Car_ID" value={form.Car_ID} onChange={handleChange} required>
                        <option value="">-- Select a Vehicle --</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.Car_ID} value={vehicle.Car_ID}>
                                {vehicle.Color} {vehicle.Interior} (ID: {vehicle.Car_ID})
                            </option>
                        ))}
                    </select>
                </label>
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
                <button className="submit-button" type="submit">Assign Vehicle</button>
            </form>
        </div>
    );
};

export default AssignVehicle;
