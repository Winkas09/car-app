import CarItem from "./CarItem";
import React, { useContext } from "react";
import { CarContext } from "./CarContext";
import { Typography, Box, Paper } from "@mui/material";

const CarList = () => {
  const { cars, deleteCar, editCar } = useContext(CarContext);

  if (cars.length === 0) {
    return <Typography variant="h6">No cars yet...</Typography>;
  }
  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={2}>
      {cars.map((car, index) => (
        <Paper elevation={3} key={index}>
          <CarItem car={car} onDelete={deleteCar} onEdit={editCar} />
        </Paper>
      ))}
    </Box>
  );
};

export default CarList;