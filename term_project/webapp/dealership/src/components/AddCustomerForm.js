import React, { useState } from "react";

function AddCustomerForm({ addCustomer }) {
  const [form, setForm] = useState({ fname: "", mname: "", lname: "", email: "", phone: "", address: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(form);
    setForm({ fname: "", mname: "", lname: "", email: "", phone: "", address: "" });
  };

  return (
    <div className="customer-form">
      <h2>Add a Customer</h2>
      <form onSubmit={handleSubmit}>
        <input name="fname" placeholder="First Name" value={form.fname} onChange={handleChange} />
        <input name="fname" placeholder="Middle Name" value={form.mname} onChange={handleChange} />
        <input name="fname" placeholder="Last Name" value={form.lname} onChange={handleChange} />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomerForm;
