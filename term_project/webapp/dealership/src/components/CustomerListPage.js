// src/components/CustomerListPage.js
import React from "react";

function CustomerListPage({ customers }) {
  return (
    <div className="customer-list-page">
      <h2>Customer List</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>
            <strong>Name:</strong> {customer.F_Name} {customer.M_Name} {customer.L_Name}, <strong>Email:</strong> {customer.Email}, <strong>Phone:</strong> {customer.Phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerListPage;
