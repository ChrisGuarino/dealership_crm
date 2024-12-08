import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAppointmentDetails } from '../../api';
import moment from 'moment';
import '../../styling/AppointmentDetails.css';

const AppointmentDetails = () => {
    const { id } = useParams(); // Get the appointment ID from the URL
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        fetchAppointmentDetails(id)
            .then((response) => setAppointment(response.data))
            .catch((err) => console.error('Error fetching appointment details:', err));
    }, [id]);

    if (!appointment) {
        return <p className="loading-text">Loading appointment details...</p>;
    }

    const formattedDropOff = moment(appointment.Drop_Off).format('MMMM Do, YYYY, h:mm A');
    const formattedPickup = moment(appointment.Pick_Up).format('MMMM Do, YYYY, h:mm A');
    const formattedDateMade = moment(appointment.Appointment_Made_Date).format('MMMM Do, YYYY');

    return (
        <div className="appointment-details-container">
            <h1 className="title">Appointment #{appointment.Appointment_ID}</h1>
            <div className="appointment-info">
                <p><strong>Car ID:</strong> {appointment.Car_ID}</p>
                <p><strong>Customer ID:</strong> {appointment.Customer_ID}</p>
                <p><strong>Drop Off:</strong> {formattedDropOff}</p>
                <p><strong>Pick Up:</strong> {formattedPickup}</p>
                <p><strong>Appointment Made Date:</strong> {formattedDateMade}</p>
                <p><strong>Package ID:</strong> {appointment.Package_ID}</p>
            </div>
            <h3 className="actions-title">Actions</h3>
            <ul className="actions-list">
                <li>
                    <Link to={`/service/bill/${appointment.Appointment_ID}`} className="action-link">
                        View Bill for This Appointment
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AppointmentDetails;
