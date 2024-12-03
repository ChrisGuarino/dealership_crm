import React from "react";

function CarDetails({ car }) {
  return (
    <div>
      <h2>Car Details</h2>
      <p><strong>Make:</strong> {car.make}</p>
      <p><strong>Model:</strong> {car.model}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Price:</strong> ${car.price}</p>
      <p><strong>Owner:</strong> {car.owner}</p>
    </div>
  );
}

export default CarDetails;
