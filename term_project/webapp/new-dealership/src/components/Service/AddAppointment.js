import React, { useState, useEffect } from 'react';
import { createAppointment, fetchCustomerVehicles, fetchCustomers, fetchPackages, fetchTasks } from '../../api';
import '../../styling/AddAppointment.css';

const AddAppointment = () => {
    const [appointment, setAppointment] = useState({
        Start_Time: '',
        End_Time: '',
        Date: '',
        Drop_Off: '',
        Pick_Up: '',
        Appointment_Made_Date: '',
        Car_ID: '',
        Package_ID: '',
        Customer_ID: '',
    });

    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [packages, setPackages] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);

    useEffect(() => {
        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data))
            .catch((error) => console.error('Error fetching vehicles:', error));

        fetchCustomers()
            .then((response) => setCustomers(response.data))
            .catch((error) => console.error('Error fetching customers:', error));

        fetchPackages()
            .then((response) => setPackages(response.data))
            .catch((error) => console.error('Error fetching packages:', error));

        fetchTasks()
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });
    };

    const handleTaskToggle = (taskId) => {
        setSelectedTasks((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = { ...appointment, Additional_Tasks: selectedTasks };
        createAppointment(data)
            .then(() => {
                alert('Appointment added successfully!');
                setAppointment({
                    Start_Time: '',
                    End_Time: '',
                    Date: '',
                    Drop_Off: '',
                    Pick_Up: '',
                    Appointment_Made_Date: '',
                    Car_ID: '',
                    Package_ID: '',
                    Customer_ID: '',
                });
                setSelectedTasks([]);
            })
            .catch((err) => {
                console.error('Error adding appointment:', err);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="add-appointment-form">
            <h1>Add Service Appointment</h1>

            <label>
                Start Time:
                <input
                    type="time"
                    name="Start_Time"
                    value={appointment.Start_Time}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                End Time:
                <input
                    type="time"
                    name="End_Time"
                    value={appointment.End_Time}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Date:
                <input
                    type="date"
                    name="Date"
                    value={appointment.Date}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Drop Off:
                <input
                    type="datetime-local"
                    name="Drop_Off"
                    value={appointment.Drop_Off}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Pick Up:
                <input
                    type="datetime-local"
                    name="Pick_Up"
                    value={appointment.Pick_Up}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Appointment Made Date:
                <input
                    type="date"
                    name="Appointment_Made_Date"
                    value={appointment.Appointment_Made_Date}
                    onChange={handleChange}
                    required
                />
            </label>

            <label>
                Select Vehicle:
                <select name="Car_ID" value={appointment.Car_ID} onChange={handleChange} required>
                    <option value="">-- Select Vehicle --</option>
                    {vehicles.map((vehicle) => (
                        <option key={vehicle.Car_ID} value={vehicle.Car_ID}>
                            {vehicle.Color} {vehicle.Interior} (ID: {vehicle.Car_ID})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Select Customer:
                <select name="Customer_ID" value={appointment.Customer_ID} onChange={handleChange} required>
                    <option value="">-- Select Customer --</option>
                    {customers.map((customer) => (
                        <option key={customer.Customer_ID} value={customer.Customer_ID}>
                            {customer.F_Name} {customer.L_Name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Select Package:
                <select name="Package_ID" value={appointment.Package_ID} onChange={handleChange} required>
                    <option value="">-- Select Package --</option>
                    {packages.map((pkg) => (
                        <option key={pkg.Package_ID} value={pkg.Package_ID}>
                            {pkg.Name}
                        </option>
                    ))}
                </select>
            </label>

            <h3>Additional Tasks (Optional)</h3>
            <ul className="tasks-list">
                {tasks.map((task) => {
                    const isSelected = selectedTasks.includes(task.Task_ID);
                    return (
                        <li key={task.Task_ID} className="task-item">
                            <button
                                type="button"
                                className={`toggle-btn ${isSelected ? 'active' : ''}`}
                                onClick={() => handleTaskToggle(task.Task_ID)}
                            >
                                {task.Name}
                            </button>
                        </li>
                    );
                })}
            </ul>

            <button type="submit" className="submit-btn">
                Add Appointment
            </button>
        </form>
    );
};

export default AddAppointment;
