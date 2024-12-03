import React, { useEffect, useState } from 'react';
import { fetchAppointments } from '../../api';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments()
            .then((response) => setAppointments(response.data))
            .catch((err) => console.error('Error fetching appointments:', err));
    }, []);

    return (
        <div>
            <h1>Service Appointments</h1>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.Appointment_ID}>
                        Appointment #{appointment.Appointment_ID} - Car ID: {appointment.Car_ID}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
