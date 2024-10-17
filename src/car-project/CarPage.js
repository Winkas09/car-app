import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import CarForm from "./CarForm";
import CarList from "./CarList";
import { CarContext } from "./CarContext";
import { API_URL } from "../api-project/Config";

const CarPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/cars`)
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const addCar = (car) => {
    setCars((prevCars) => [...prevCars, car]);
  };

  const deleteCar = (carToDelete) => {
    fetch(`${API_URL}/cars/${carToDelete.id}`, {
      method: "DELETE",
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

  const editCar = (updatedCar) => {
    fetch(`${API_URL}/cars/${updatedCar.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedCars = cars.map((car) =>
          car.id === updatedCar.id ? updatedCar : car
        );
        setCars(updatedCars);
      })
      .catch((error) => {
        console.error('There was a problem with the edit request:', error);
      });
  };

  const ctxValue = {
    cars,
    addCar,
    deleteCar,
    editCar,
  };

  return (
    <CarContext.Provider value={ctxValue}>
      <Container>
        <Box my={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Car Page
          </Typography>
          <CarForm />
          <CarList />
        </Box>
      </Container>
    </CarContext.Provider>
  );
};

export default CarPage;