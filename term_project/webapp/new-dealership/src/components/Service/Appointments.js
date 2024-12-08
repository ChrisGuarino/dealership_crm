import React, { useEffect, useState } from 'react';
import { fetchAppointments } from '../../api';
import { Link } from 'react-router-dom';
import '../../styling/Appointments.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments()
            .then((response) => setAppointments(response.data))
            .catch((err) => console.error('Error fetching appointments:', err));
    }, []);

    return (
        <div className="appointments-container">
            <h1 className="title">Service Appointments</h1>
            <ul className="appointments-list">
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <li key={appointment.Appointment_ID} className="appointment-item">
                            <Link
                                to={`/service/appointments/${appointment.Appointment_ID}`}
                                className="appointment-link"
                            >
                                Appointment #{appointment.Appointment_ID} - Car ID: {appointment.Car_ID}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="no-appointments">No service appointments found.</p>
                )}
            </ul>
        </div>
    );
};

export default Appointments;
