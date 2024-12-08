import React, { useEffect, useState } from 'react';
import {
    fetchAppointments,
    fetchTasksForAppointment,
    fetchPartsForTask,
    logWasPerformed,
    logWasReplaced,
} from '../../api';
import '../../styling/LogWasPerformed.css';

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
        fetchAppointments()
            .then((response) => setAppointments(response.data))
            .catch((err) => console.error('Error fetching appointments:', err));
    }, []);

    useEffect(() => {
        if (!form.appointmentId) {
            setTasks([]);
            setParts([]);
        }
    }, [form.appointmentId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        if (name === 'appointmentId' && value) {
            fetchTasksForAppointment(value)
                .then((response) => setTasks(response.data))
                .catch((err) => {
                    console.error('Error fetching tasks for appointment:', err);
                    setTasks([]);
                });
        }

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

        logWasPerformed({ appointmentId, taskId, laborCost, time })
            .then(() => {
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
        <div className="log-task-container">
            <h1 className="title">Log Performed Tasks and Parts</h1>
            {message && <p className="message">{message}</p>}
            {error && <p className="error">{error}</p>}
            <form className="log-task-form" onSubmit={handleSubmit}>
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
                                Appointment #{appt.Appointment_ID} (Customer: {appt.Customer_ID})
                            </option>
                        ))}
                    </select>
                </label>

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

                <button className="submit-button" type="submit">
                    Log Task and Parts
                </button>
            </form>
        </div>
    );
};

export default LogWasPerformed;
