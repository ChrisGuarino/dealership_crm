import React, { useState } from "react";

function AddCarForm({ addCar }) {
  const [form, setForm] = useState({ vin: "", make: "", model: "", year: "", price: "", owner: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you might send `form` data to an API
    addCar(form);
    setForm({ vin: "", make: "", model: "", year: "", price: "", owner: "" });
  };

  return (
    <div>
      <h2>Add a Car</h2>
      <form onSubmit={handleSubmit}>
      <input name="vin" placeholder="VIN" value={form.vin} onChange={handleChange} />
        <input name="make" placeholder="Make" value={form.make} onChange={handleChange} />
        <input name="model" placeholder="Model" value={form.model} onChange={handleChange} />
        <input name="year" placeholder="Year" value={form.year} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input name="owner" placeholder="Owner" value={form.owner} onChange={handleChange} />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
}

export default AddCarForm;
