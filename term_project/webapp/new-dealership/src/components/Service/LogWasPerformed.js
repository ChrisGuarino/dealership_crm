import React, { useEffect, useState } from 'react';
import { fetchAppointments, fetchTasksForAppointment, fetchPartsForTask, logWasPerformed, logWasReplaced } from '../../api';

const LogWasPerformed = () => {
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
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch appointments for the first dropdown
        fetchAppointments()
            .then((response) => setAppointments(response.data))
            .catch((err) => console.error('Error fetching appointments:', err));
    }, []);

    useEffect(() => {
        // Reset tasks and parts when appointment changes
        if (!form.appointmentId) {
            setTasks([]);
            setParts([]);
        }
    }, [form.appointmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        // Fetch tasks when an appointment is selected
        if (name === 'appointmentId' && value) {
            fetchTasksForAppointment(value)
                .then((response) => setTasks(response.data))
                .catch((err) => {
                    console.error('Error fetching tasks for appointment:', err);
                    setTasks([]);
                });
        }

        // Fetch parts when a task is selected
        if (name === 'taskId' && value) {
            fetchPartsForTask(value)
                .then((response) => setParts(response.data))
                .catch((err) => {
                    console.error('Error fetching parts for task:', err);
                    setParts([]);
                });
        }
    };

    const handlePartToggle = (partId) => {
        setSelectedParts((prevSelectedParts) =>
            prevSelectedParts.includes(partId)
                ? prevSelectedParts.filter((id) => id !== partId)
                : [...prevSelectedParts, partId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { appointmentId, taskId, laborCost, time } = form;

        if (!appointmentId || !taskId || !laborCost || !time) {
            setError('All fields are required.');
            return;
        }

        // Log the task in Was_Performed
        logWasPerformed({ appointmentId, taskId, laborCost, time })
            .then(() => {
                // Log parts in Was_Replaced
                if (selectedParts.length > 0) {
                    return logWasReplaced({ appointmentId, partIds: selectedParts });
                }
            })
            .then(() => {
                setMessage('Task and parts successfully logged.');
                setError('');
                setForm({ appointmentId: '', taskId: '', laborCost: '', time: '' });
                setSelectedParts([]);
                setTasks([]);
                setParts([]);
            })
            .catch((err) => {
                console.error('Error logging task or parts:', err);
                setError('Failed to log task or parts.');
            });
    };

    return (
        <div>
            <h1>Log Performed Tasks and Parts</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                <label>
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
                                Appointment #{appt.Appointment_ID} (Customer: {appt.Customer_Name})
                            </option>
                        ))}
                    </select>
                </label>

                <label>
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

                <label>
                    Labor Cost ($):
                    <input
                        type="number"
                        name="laborCost"
                        value={form.laborCost}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Time (minutes):
                    <input
                        type="number"
                        name="time"
                        value={form.time}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Select Parts Used:
                    <ul>
                        {parts.length > 0 ? (
                            parts.map((part) => (
                                <li key={part.Part_ID}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={part.Part_ID}
                                            checked={selectedParts.includes(part.Part_ID)}
                                            onChange={() => handlePartToggle(part.Part_ID)}
                                        />
                                        {part.Name} (${Number(part.Cost_Of_Part).toFixed(2)})
                                    </label>
                                </li>
                            ))
                        ) : (
                            <li>No parts available for the selected task.</li>
                        )}
                    </ul>
                </label>

                <button type="submit">Log Task and Parts</button>
            </form>
        </div>
    );
};

export default LogWasPerformed;
