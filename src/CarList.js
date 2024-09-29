import CarItem from "./CarItem";
import React, { useContext } from "react";
import { CarContext } from "./CarContext";

const CarList = () => {
  const { cars } = useContext(CarContext);
  return (
    <div>
      {cars.map((car, index) => (
        <CarItem key={index} car={car} />
      ))}
    </div>
  );
};

export default CarList;
