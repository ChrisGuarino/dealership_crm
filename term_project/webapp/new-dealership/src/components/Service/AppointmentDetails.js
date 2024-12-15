// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { useParams, Link } from 'react-router-dom'; // Hooks for route parameters and navigation
import { fetchAppointmentDetails } from '../../api'; // API function to fetch appointment details
import moment from 'moment'; // Library for date formatting
import '../../styling/AppointmentDetails.css'; // Import the CSS file for styling

// AppointmentDetails component definition
const AppointmentDetails = () => {
    // Extract the appointment ID from the route parameters
    const { id } = useParams(); 
    // State to store fetched appointment details
    const [appointment, setAppointment] = useState(null);

    // useEffect to fetch appointment details when the component mounts or ID changes
    useEffect(() => {
        fetchAppointmentDetails(id)
            .then((response) => setAppointment(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching appointment details:', err)); // Handle errors
    }, [id]); // Dependency array ensures effect runs when ID changes

    // If appointment details are not yet loaded, display a loading message
    if (!appointment) {
        return <p className="loading-text">Loading appointment details...</p>;
    }

    // Format dates using Moment.js
    const formattedDropOff = moment(appointment.Drop_Off).format('MMMM Do, YYYY, h:mm A');
    const formattedPickup = moment(appointment.Pick_Up).format('MMMM Do, YYYY, h:mm A');
    const formattedDateMade = moment(appointment.Appointment_Made_Date).format('MMMM Do, YYYY');

    // Render appointment details
    return (
        <div className="appointment-details-container">
            <h1 className="title">Appointment #{appointment.Appointment_ID}</h1>
            <div className="appointment-info">
                <p><strong>Car ID:</strong> {appointment.Car_ID}</p>
                <p><strong>Customer:</strong> {appointment.F_Name} {appointment.L_Name} (ID: {appointment.Customer_ID})</p>
                <p><strong>Drop Off:</strong> {formattedDropOff}</p>
                <p><strong>Pick Up:</strong> {formattedPickup}</p>
                <p><strong>Appointment Made Date:</strong> {formattedDateMade}</p>
                <p><strong>Package:</strong> {appointment.Package_Name} (ID: {appointment.Package_ID})</p>
            </div>
            
            {/* Render actions related to the appointment */}
            <h3 className="actions-title">Actions</h3>
            <ul className="actions-list">
                <li>
                    {/* Link to view the bill for this appointment */}
                    <Link to={`/service/bill/${appointment.Appointment_ID}`} className="action-link">
                        View Bill for This Appointment
                    </Link>
                </li>
            </ul>
        </div>
    );
};

// Export the AppointmentDetails component as the default export
export default AppointmentDetails;
