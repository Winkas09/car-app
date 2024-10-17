import React, { useState } from "react";
import calculateExtraPrice from "./ExtraPrice";
import carDiscount from "./CarDiscount";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, MenuItem } from "@mui/material";

const CarItem = ({ car, onDelete, onEdit }) => {
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...car });

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = () => {
    const updatedBasePrice = parseFloat(editFormData.basePrice);
    const { enginePrice, colorPrice, transmissionPrice, totalExtraPrice } = calculateExtraPrice(
      editFormData.engine,
      editFormData.color,
      editFormData.transmission
    );
    const discount = carDiscount(editFormData.mileage, editFormData.discount, editFormData.year, updatedBasePrice);

    const updatedFinalPrice = updatedBasePrice + totalExtraPrice - discount;
    const updatedVat = updatedFinalPrice * 0.21;
    const updatedFinalPriceWithVAT = updatedFinalPrice + updatedVat;

    onEdit({ ...editFormData, finalPrice: updatedFinalPriceWithVAT });
    setIsEditing(false);
  };

  const renderEditDialog = () => (
    <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
      <DialogTitle>Edit Car</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand"
          name="brand"
          value={editFormData.brand}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          name="model"
          value={editFormData.model}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          value={editFormData.year}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Base Price"
          name="basePrice"
          value={editFormData.basePrice}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mileage"
          name="mileage"
          value={editFormData.mileage}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Image URL"
          name="imageUrl"
          value={editFormData.imageUrl}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Discount"
          name="discount"
          value={editFormData.discount}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Transmission"
          name="transmission"
          value={editFormData.transmission}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="manual">Manual</MenuItem>
          <MenuItem value="automatic">Automatic</MenuItem>
        </TextField>
        <TextField
          select
          label="Engine"
          name="engine"
          value={editFormData.engine}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="petrol">Petrol</MenuItem>
          <MenuItem value="diesel">Diesel</MenuItem>
          <MenuItem value="electric">Electric</MenuItem>
          <MenuItem value="hybrid">Hybrid</MenuItem>
        </TextField>
        <TextField
          select
          label="Color"
          name="color"
          value={editFormData.color}
          onChange={handleEditChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        {editFormData.color === "other" && (
          <TextField
            label="Other Color"
            name="otherColor"
            value={editFormData.otherColor}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsEditing(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEditSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderCarDetails = () => (
    <>
      <Typography variant="h5" component="div">
        {car.brand} {car.model} ({car.year})
      </Typography>
      {car.imageUrl && !imageError && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, padding: 2 }}>
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            style={{ maxWidth: '100%', maxHeight: '200px', margin: 'auto' }}
            onError={() => setImageError(true)}
          />
        </Box>
      )}
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(car)}>
          Delete
        </Button>
      </Box>
    </>
  );

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        {renderCarDetails()}
        {renderEditDialog()}
      </CardContent>
    </Card>
  );
};

export default CarItem;