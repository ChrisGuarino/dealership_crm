import React, { useEffect, useState } from 'react';
import { fetchAppointments, deleteAppointment } from '../../api';

const DeleteAppointment = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments()
            .then((response) => setAppointments(response.data))
            .catch((err) => console.error('Error fetching appointments:', err));
    }, []);

    const handleDelete = (appointmentId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this appointment?');
        if (confirmDelete) {
            deleteAppointment(appointmentId)
                .then(() => {
                    setAppointments(appointments.filter((appt) => appt.Appointment_ID !== appointmentId));
                    alert('Appointment deleted successfully!');
                })
                .catch((err) => console.error('Error deleting appointment:', err));
        }
    };

    return (
        <div>
            <h1>Delete Service Appointment</h1>
            <ul>
                {appointments.map((appt) => (
                    <li key={appt.Appointment_ID}>
                        Appointment #{appt.Appointment_ID} - Car ID: {appt.Car_ID}
                        <button
                            onClick={() => handleDelete(appt.Appointment_ID)}
                            style={{ marginLeft: '10px', color: 'red' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeleteAppointment;
