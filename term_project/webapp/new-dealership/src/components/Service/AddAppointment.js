// Import necessary modules and components
import React, { useState, useEffect } from 'react'; // React core and hooks
import { createAppointment, fetchCustomerVehicles, fetchCustomers, fetchPackages, fetchTasks } from '../../api'; // API functions
import '../../styling/AddAppointment.css'; // Import the CSS file for styling

// AddAppointment component definition
const AddAppointment = () => {
    // State to manage appointment data
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

    // Additional states for managing data
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]); // Filtered list of vehicles for a customer
    const [packages, setPackages] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]); // Selected tasks for the appointment

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchCustomers()
            .then((response) => setCustomers(response.data)) // Set customers list
            .catch((error) => console.error('Error fetching customers:', error));

        fetchCustomerVehicles()
            .then((response) => setVehicles(response.data)) // Set vehicles list
            .catch((error) => console.error('Error fetching vehicles:', error));

        fetchPackages()
            .then((response) => setPackages(response.data)) // Set packages list
            .catch((error) => console.error('Error fetching packages:', error));

        fetchTasks()
            .then((response) => setTasks(response.data)) // Set tasks list
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment({ ...appointment, [name]: value });

        // Filter vehicles based on selected customer
        if (name === 'Customer_ID') {
            const ownedVehicles = vehicles.filter(
                (vehicle) => vehicle.Customer_ID === parseInt(value, 10)
            );
            setFilteredVehicles(ownedVehicles);
            setAppointment((prev) => ({ ...prev, Car_ID: '' })); // Reset selected vehicle
        }
    };

    // Toggle task selection
    const handleTaskToggle = (taskId) => {
        setSelectedTasks((prev) =>
            prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
        );
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...appointment, Additional_Tasks: selectedTasks };

        createAppointment(data)
            .then(() => {
                alert('Appointment added successfully!');
                // Reset form fields and state
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
                setFilteredVehicles([]);
            })
            .catch((err) => console.error('Error adding appointment:', err));
    };

    return (
        <form onSubmit={handleSubmit} className="add-appointment-form">
            <h1>Add Service Appointment</h1>

            {/* Input fields for appointment details */}
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

            {/* Dropdowns for customer, vehicle, and package selection */}
            <label>
                Select Customer:
                <select
                    name="Customer_ID"
                    value={appointment.Customer_ID}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Customer --</option>
                    {customers.map((customer) => (
                        <option key={customer.Customer_ID} value={customer.Customer_ID}>
                            {customer.F_Name} {customer.L_Name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Select Vehicle:
                <select
                    name="Car_ID"
                    value={appointment.Car_ID}
                    onChange={handleChange}
                    required
                    disabled={!filteredVehicles.length}
                >
                    <option value="">-- Select Vehicle --</option>
                    {filteredVehicles.map((vehicle) => (
                        <option key={vehicle.Car_ID} value={vehicle.Car_ID}>
                            {vehicle.Make} {vehicle.Model} (ID: {vehicle.Car_ID})
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Select Package:
                <select
                    name="Package_ID"
                    value={appointment.Package_ID}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Package --</option>
                    {packages.map((pkg) => (
                        <option key={pkg.Package_ID} value={pkg.Package_ID}>
                            {pkg.Name}
                        </option>
                    ))}
                </select>
            </label>

            {/* Task selection */}
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

// Export the AddAppointment component as the default export
export default AddAppointment;
