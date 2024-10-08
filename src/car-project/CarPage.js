import React, { useState, useEffect } from "react";
import CarForm from "./CarForm";
import CarList from "./CarList";
import { CarContext } from "./CarContext";
import { API_URL } from "../api-project/Config";

const CarPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${API_URL}/cars`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchCars();
  }, []);

  const addCar = (car) => {
    setCars([...cars, car]);
  };

  const deleteCar = (carToDelete) => {
    fetch(`${API_URL}/cars/${carToDelete.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedCars = cars.filter(car => car.id !== carToDelete.id);
        setCars(updatedCars);
      })
      .catch((error) => {
        console.error('There was a problem with the delete request:', error);
      });
  };

  const ctxValue = {
    cars,
    addCar,
    deleteCar,
  };

  return (
    <CarContext.Provider value={ctxValue}>
      <div>
        <h1>Car Page</h1>
        <CarForm addCar={addCar} />
        <CarList />
      </div>
    </CarContext.Provider>
  );
};

export default CarPage;