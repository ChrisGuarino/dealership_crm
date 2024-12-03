import React, { useState, useEffect } from 'react';
import { createAppointment, fetchCustomerVehicles, fetchCustomers, fetchPackages } from '../../api';

const AddAppointment = () => {
    const [appointment, setAppointment] = useState({
        Drop_Off: '',
        Pick_Up: '',
        Appointment_Made_Date: '',
        Car_ID: '',
        Package_ID: '',
        Time_Slot_ID: '',
        Customer_ID: '',
    });

    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        // Fetch data for dropdowns
        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data))
            .catch((error) => console.error('Error fetching vehicles:', error));

        fetchCustomers()
            .then((response) => setCustomers(response.data))
            .catch((error) => console.error('Error fetching customers:', error));

        fetchPackages()
            .then((response) => setPackages(response.data))
            .catch((error) => console.error('Error fetching packages:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createAppointment(appointment)
            .then(() => {
                alert('Appointment added successfully!');
                setAppointment({
                    Drop_Off: '',
                    Pick_Up: '',
                    Appointment_Made_Date: '',
                    Car_ID: '',
                    Package_ID: '',
                    Time_Slot_ID: '',
                    Customer_ID: '',
                });
            })
            .catch((err) => {
                console.error('Error adding appointment:', err);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Service Appointment</h1>
            <input
                type="datetime-local"
                name="Drop_Off"
                value={appointment.Drop_Off}
                onChange={handleChange}
                placeholder="Drop Off"
                required
            />
            <input
                type="datetime-local"
                name="Pick_Up"
                value={appointment.Pick_Up}
                onChange={handleChange}
                placeholder="Pick Up"
                required
            />
            <input
                type="datetime-local"
                name="Appointment_Made_Date"
                value={appointment.Appointment_Made_Date}
                onChange={handleChange}
                placeholder="Appointment Made Date"
                required
            />
            <select name="Car_ID" value={appointment.Car_ID} onChange={handleChange} required>
                <option value="">-- Select Vehicle --</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.Car_ID} value={vehicle.Car_ID}>
                        {vehicle.Color} {vehicle.Interior} (ID: {vehicle.Car_ID})
                    </option>
                ))}
            </select>
            <select name="Customer_ID" value={appointment.Customer_ID} onChange={handleChange} required>
                <option value="">-- Select Customer --</option>
                {customers.map((customer) => (
                    <option key={customer.Customer_ID} value={customer.Customer_ID}>
                        {customer.F_Name} {customer.L_Name}
                    </option>
                ))}
            </select>
            <select name="Package_ID" value={appointment.Package_ID} onChange={handleChange} required>
                <option value="">-- Select Package --</option>
                {packages.map((pkg) => (
                    <option key={pkg.Package_ID} value={pkg.Package_ID}>
                        {pkg.Name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                name="Time_Slot_ID"
                value={appointment.Time_Slot_ID}
                onChange={handleChange}
                placeholder="Time Slot ID"
                required
            />
            <button type="submit">Add Appointment</button>
        </form>
    );
};

export default AddAppointment;
