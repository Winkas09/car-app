import React from "react";
import calculateExtraPrice from "./ExtraPrice";
import carDiscount from "./CarDiscount";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from "@mui/material";

const CarItem = ({ car, onDelete }) => {
  const basePrice = parseFloat(car.basePrice);
  const { enginePrice, colorPrice, transmissionPrice, totalExtraPrice } = calculateExtraPrice(
    car.engine,
    car.color,
    car.transmission
  );
  const discount = carDiscount(car.mileage, car.discount, car.year, basePrice);

  const finalPrice = basePrice + totalExtraPrice - discount;
  const vat = finalPrice * 0.21;
  const finalPriceWithVAT = finalPrice + vat;

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {car.brand} {car.model} ({car.year})
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Automobilio kaina:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary={`Bazinė kaina: ${basePrice}€`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Papildomos paslaugos:" />
            <List>
              <ListItem>
                <ListItemText primary={`Variklio tipas: ${car.engine} (${enginePrice}€)`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Spalva: ${car.color} (${colorPrice}€)`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Transmisija: ${car.transmission} (${transmissionPrice}€)`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Viso už papildomas paslaugas: ${totalExtraPrice}€`} />
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <ListItemText primary="Kainos sumažėjimas:" />
            <List>
              <ListItem>
                <ListItemText primary={`Dėl kilometražo: ${carDiscount(car.mileage, 0, car.year, basePrice)}€`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Nuolaida: ${car.discount}€`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Viso kainos sumažėjimas: ${discount}€`} />
              </ListItem>
            </List>
          </ListItem>
        </List>
        <Typography variant="body1">
          Galutinė kaina su PVM: {finalPriceWithVAT}€
        </Typography>
        <Button variant="contained" color="secondary" onClick={() => onDelete(car)} sx={{ marginTop: 2 }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CarItem;