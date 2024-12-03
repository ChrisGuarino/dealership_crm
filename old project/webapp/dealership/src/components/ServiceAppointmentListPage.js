// src/components/ServiceAppointmentListPage.js
import React from "react";

function ServiceAppointmentListPage({ serviceAppointments}) {
  return (
    <div className="service-appointment-list-page">
      <h2>Service Appointments</h2>
      {serviceAppointments.length === 0 ? (
        <p>No service appointments scheduled.</p>
      ) : (
        <ul>
          {serviceAppointments.map((appointment, index) => (
            <li key={index}>
              <strong>Date:</strong> {appointment.Date}
              <br />
              <strong>Start Time:</strong> {appointment.Start_Time}
              <br />
              <strong>Appointment ID:</strong> {appointment.AppointmentID}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ServiceAppointmentListPage;
