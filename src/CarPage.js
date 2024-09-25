import React, { useState } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";

const CarPage = () => {
  const [cars, setCars] = useState([]);

  const addCar = (car) => {
    setCars([...cars, car]);
  };
  return (
    <div>
      <h1>Car Page</h1>
      <CarForm addCar={addCar} />
      <CarList cars={cars} />
    </div>
  );
};

export default CarPage;
