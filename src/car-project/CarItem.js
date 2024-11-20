import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { API_URL } from "../api-project/Config";
import calculateExtraPrice from "./ExtraPrice";
import carDiscount from "./CarDiscount";

const CarItem = ({ car, onDelete, onEdit }) => {
  const [imageError, setImageError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...car });

  const basePrice = parseFloat(car.basePrice);
  const { totalExtraPrice } = calculateExtraPrice(
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
    fetch(`${API_URL}/api/car-project/${editFormData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editFormData),
    })
      .then((response) => response.json())
      .then((updatedCar) => {
        onEdit(updatedCar);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('There was a problem with the edit request:', error);
      });
  };

  return (
    <Box p={2}>
      {isEditing ? (
        <Box component="form" onSubmit={handleEditSubmit}>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Typography variant="h6">{car.brand} {car.model}</Typography>
          <Typography>Year: {car.year}</Typography>
          <Typography>Engine: {car.engine}</Typography>
          <Typography>Base Price: {car.basePrice}€</Typography>
          <Typography>Mileage: {car.mileage} km</Typography>
          <Typography>Color: {car.color}</Typography>
          <Typography>Discount: {car.discount}€</Typography>
          <Typography>Transmission: {car.transmission}</Typography>
          <Typography>Final Price: {finalPriceWithVAT.toFixed(2)}€ (including VAT)</Typography>
          {car.imageUrl && !imageError && (
            <img
              src={car.imageUrl}
              alt={`${car.brand} ${car.model}`}
              onError={() => setImageError(true)}
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => onDelete(car)}>
              Delete
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CarItem;