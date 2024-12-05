import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAppointmentDetails } from '../../api';
import moment from "moment";

const AppointmentDetails = () => {
    const { id } = useParams(); // Get the appointment ID from the URL
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        fetchAppointmentDetails(id)
            .then((response) => setAppointment(response.data))
            .catch((err) => console.error('Error fetching appointment details:', err));
    }, [id]);

    if (!appointment) {
        return <p> {id} Loading appointment details... {id}</p>;
    }
    const formattedDropOff = moment(appointment.Drop_Off).format("MMMM Do, YYYY, h:mm A");
    const formattedPickup = moment(appointment.Pick_Up).format("MMMM Do, YYYY, h:mm A");
    const formattedDateMade = moment(appointment.Appointment_Made_Date).format("MMMM Do, YYYY");
    return (
        <div>
            <h1>Appointment #{appointment.Appointment_ID}</h1>
            <p>Car ID: {appointment.Car_ID}</p>
            <p>Customer ID: {appointment.Customer_ID}</p>
            <p>Drop Off: {formattedDropOff}</p>
            <p>Pick Up: {formattedPickup}</p>
            <p>Appointment Made Date: {formattedDateMade}</p>
            <p>Package ID: {appointment.Package_ID}</p>
            {/* Add more fields as needed */}
            <h3>Actions</h3>
            <ul>
                <li>
                    <Link to={`/service/bill/${appointment.Appointment_ID}`}>
                        View Bill for This Appointment
                    </Link>
                </li>
                {/* Add other actions here if needed */}
            </ul>
        </div>
    );
};

export default AppointmentDetails;
