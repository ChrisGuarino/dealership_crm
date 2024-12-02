// src/components/CarListPage.js
import React from "react";

function CarListPage({ cars, selectCar }) {
  return (
    <div className="car-list-page">
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id} onClick={() => selectCar(car)}>
            {car.Make} {car.Model} - {car.Year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarListPage;
