import CarItem from "./CarItem";
import React, { useContext } from "react";
import { CarContext } from "./CarContext";

const CarList = () => {
  const { cars } = useContext(CarContext);

  if (cars.length === 0) {
    return <h2>No cars yet...</h2>;
  }
  return (
    <div>
      {cars.map((car, index) => (
        <CarItem key={index} car={car} />
      ))}
    </div>
  );
};

export default CarList;
