// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import {
    fetchAppointments,
    fetchTasksForAppointment,
    fetchPartsForTask,
    logWasPerformed,
    logWasReplaced,
} from '../../api'; // API functions
import '../../styling/LogWasPerformed.css'; // Import the CSS file for styling

// LogWasPerformed component definition
const LogWasPerformed = () => {
    // State for managing appointments, tasks, parts, and form data
    const [appointments, setAppointments] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [parts, setParts] = useState([]);
    const [form, setForm] = useState({
        appointmentId: '',
        taskId: '',
        laborCost: '',
        time: '',
    });
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedTaskDetails, setSelectedTaskDetails] = useState(null); // Store selected task details
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // useEffect to fetch appointments when the component mounts
    useEffect(() => {
        fetchAppointments()
            .then((response) => setAppointments(response.data)) // Update state with fetched appointments
            .catch((err) => console.error('Error fetching appointments:', err)); // Handle errors
    }, []);

    // Reset tasks and parts when the appointment ID changes
    useEffect(() => {
        if (!form.appointmentId) {
            setTasks([]);
            setParts([]);
        }
    }, [form.appointmentId]);

    // Handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Fetch tasks for the selected appointment
        if (name === 'appointmentId' && value) {
            fetchTasksForAppointment(value)
                .then((response) => setTasks(response.data)) // Update state with fetched tasks
                .catch((err) => {
                    console.error('Error fetching tasks for appointment:', err);
                    setTasks([]);
                });
        }

        // Fetch parts for the selected task and update task details
        if (name === 'taskId' && value) {
            fetchPartsForTask(value)
                .then((response) => setParts(response.data)) // Update state with fetched parts
                .catch((err) => {
                    console.error('Error fetching parts for task:', err);
                    setParts([]);
                });

            // Update the selected task details
            const selectedTask = tasks.find((task) => task.Task_ID === parseInt(value, 10));
            if (selectedTask) {
                setSelectedTaskDetails({
                    Estd_Labor_Cost: selectedTask.Estd_Labor_Cost,
                    Estd_Time: selectedTask.Estd_Time,
                });
            }
        }
    };

    // Toggle part selection
    const handlePartToggle = (partId) => {
        setSelectedParts((prevSelectedParts) =>
            prevSelectedParts.includes(partId)
                ? prevSelectedParts.filter((id) => id !== partId)
                : [...prevSelectedParts, partId]
        );
    };

    // Handle form submission to log tasks and parts
    const handleSubmit = (e) => {
        e.preventDefault();
        const { appointmentId, taskId, laborCost, time } = form;

        // Validate required fields
        if (!appointmentId || !taskId || !laborCost || !time) {
            setError('All fields are required.');
            return;
        }

        // Log the task
        logWasPerformed({ appointmentId, taskId, laborCost, time })
            .then(() => {
                // If parts are selected, log them as replaced
                if (selectedParts.length > 0) {
                    return logWasReplaced({ appointmentId, partIds: selectedParts });
                }
            })
            .then(() => {
                // Reset form and state on successful submission
                setMessage('Task and parts successfully logged.');
                setError('');
                setForm({ appointmentId: '', taskId: '', laborCost: '', time: '' });
                setSelectedParts([]);
                setTasks([]);
                setParts([]);
                setSelectedTaskDetails(null); // Reset task details
            })
            .catch((err) => {
                console.error('Error logging task or parts:', err);
                setError('Failed to log task or parts.');
            });
    };

    return (
        <div className="log-task-container">
            <h1 className="title">Log Performed Tasks and Parts</h1>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form className="log-task-form" onSubmit={handleSubmit}>
                {/* Dropdown for selecting an appointment */}
                <label className="form-label">
                    Select Appointment:
                    <select
                        name="appointmentId"
                        value={form.appointmentId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select an Appointment --</option>
                        {appointments.map((appt) => (
                            <option key={appt.Appointment_ID} value={appt.Appointment_ID}>
                                Appointment #{appt.Appointment_ID} (Customer ID: {appt.Customer_ID})
                            </option>
                        ))}
                    </select>
                </label>

                {/* Dropdown for selecting a task */}
                <label className="form-label">
                    Select Task:
                    <select
                        name="taskId"
                        value={form.taskId}
                        onChange={handleChange}
                        required
                        disabled={!form.appointmentId}
                    >
                        <option value="">-- Select a Task --</option>
                        {tasks.map((task) => (
                            <option key={task.Task_ID} value={task.Task_ID}>
                                {task.Name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Display estimated cost and time if a task is selected */}
                {selectedTaskDetails && (
                    <div className="task-details">
                        <p><strong>Estimated Labor Cost:</strong> ${selectedTaskDetails.Estd_Labor_Cost}</p>
                        <p><strong>Estimated Time:</strong> {selectedTaskDetails.Estd_Time} minutes</p>
                    </div>
                )}

                {/* Input fields for labor cost and time */}
                <label className="form-label">
                    Labor Cost ($):
                    <input
                        type="number"
                        name="laborCost"
                        value={form.laborCost}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className="form-label">
                    Time (minutes):
                    <input
                        type="number"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* List of parts for selection */}
                <label className="form-label">
                    Select Parts Used:
                    <ul className="parts-list">
                        {parts.map((part) => {
                            const isSelected = selectedParts.includes(part.Part_ID);
                            return (
                                <li key={part.Part_ID} className="part-item">
                                    <button
                                        type="button"
                                        className={`toggle-btn ${isSelected ? 'active' : ''}`}
                                        onClick={() => handlePartToggle(part.Part_ID)}
                                    >
                                        {part.Name} (${Number(part.Cost_Of_Part).toFixed(2)})
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </label>

                {/* Submit button */}
                <button className="submit-button" type="submit">
                    Log Task and Parts
                </button>
            </form>
        </div>
    );
};

// Export the LogWasPerformed component as the default export
export default LogWasPerformed;
