import CarItem from "./CarItem";
import React, { useContext } from "react";
import { CarContext } from "./CarContext";
import { Typography, Grid, Paper } from "@mui/material";

const CarList = () => {
  const { cars, deleteCar } = useContext(CarContext);

  if (cars.length === 0) {
    return <Typography variant="h6">No cars yet...</Typography>;
  }
  return (
    <Grid container spacing={2}>
      {cars.map((car, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Paper elevation={3}>
            <CarItem car={car} onDelete={deleteCar} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default CarList;