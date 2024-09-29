import React, { useState } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";
import { CarContext } from "./CarContext";

const CarPage = () => {
  const [cars, setCars] = useState([]);

  const addCar = (car) => {
    setCars([...cars, car]);
  };

  const ctxValue = {
    cars,
    addCar,
  };

  return (
    <CarContext.Provider value={ctxValue}>
    <div>
      <h1>Car Page</h1>
      <CarForm addCar={addCar} />
      <CarList cars={cars} />
    </div>
    </CarContext.Provider>
  );
};

export default CarPage;
