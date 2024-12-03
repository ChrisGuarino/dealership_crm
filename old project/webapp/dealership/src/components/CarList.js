import React from "react";

function CarList({ cars, selectCar }) {
  return (
    <div>
      <h2>Car List</h2>
      <ul>
        {cars.map((car) => (
          <li key={car.id} onClick={() => selectCar(car)}>
            {car.make} {car.model} - {car.year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
