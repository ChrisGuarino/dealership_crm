// src/components/AddServiceAppointmentForm.js
import React, { useState } from "react";

function AddServiceAppointmentForm({ cars, addServiceAppointment }) {
  const [form, setForm] = useState({
    carId: cars.length > 0 ? cars[0].id : "",
    date: "",
    serviceType: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addServiceAppointment(form);
    setForm({
      carId: cars.length > 0 ? cars[0].id : "",
      date: "",
      serviceType: "",
      notes: "",
    });
  };

  return (
    <div className="service-appointment-form">
      <h2>Create Service Appointment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Car:
          <select name="carId" value={form.carId} onChange={handleChange}>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.make} {car.model} - {car.year}
              </option>
            ))}
          </select>
        </label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
        />
        <input
          name="serviceType"
          value={form.serviceType}
          onChange={handleChange}
          placeholder="Service Type"
        />
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
        ></textarea>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
}

export default AddServiceAppointmentForm;
