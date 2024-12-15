// Import necessary modules and components
import React, { useEffect, useState } from 'react'; // React core and hooks
import { fetchAppointments } from '../../api'; // API function to fetch appointments
import { Link } from 'react-router-dom'; // Link component for navigation
import '../../styling/Appointments.css'; // Import the CSS file for styling

// Appointments component definition
const Appointments = () => {
    // State to store the list of appointments
    const [appointments, setAppointments] = useState([]);

    // useEffect to fetch the list of appointments when the component mounts
    useEffect(() => {
        fetchAppointments()
            .then((response) => setAppointments(response.data)) // Update state with fetched data
            .catch((err) => console.error('Error fetching appointments:', err)); // Handle errors
    }, []); // Empty dependency array ensures this runs only once

    // Render the appointments list
    return (
        <div className="appointments-container">
            <h1 className="title">Service Appointments</h1>
            <ul className="appointments-list">
                {/* Check if there are appointments and display them */}
                {appointments.length > 0 ? (
                    appointments.map((appointment) => (
                        <li key={appointment.Appointment_ID} className="appointment-item">
                            {/* Link to the detailed page for each appointment */}
                            <Link
                                to={`/service/appointments/${appointment.Appointment_ID}`}
                                className="appointment-link"
                            >
                                Appointment #{appointment.Appointment_ID} - Car ID: {appointment.Car_ID}
                            </Link>
                        </li>
                    ))
                ) : (
                    // Display a message if no appointments are available
                    <p className="no-appointments">No service appointments found.</p>
                )}
            </ul>
        </div>
    );
};

// Export the Appointments component as the default export
export default Appointments;
