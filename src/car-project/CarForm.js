import React, { useState, useContext } from "react";
import { API_URL } from "../api-project/Config";
import { TextField, Button, Box, MenuItem, Typography } from "@mui/material";
import { CarContext } from "./CarContext";

const initialFormData = {
  brand: "",
  model: "",
  year: "",
  engine: "petrol",
  basePrice: "",
  mileage: "",
  color: "black",
  otherColor: "",
  imageUrl: "",
  discount: "",
  transmission: "",
};

const initialValidationState = {
  brand: { isValid: true, errorMessage: "" },
  model: { isValid: true, errorMessage: "" },
  year: { isValid: true, errorMessage: "" },
  basePrice: { isValid: true, errorMessage: "" },
  mileage: { isValid: true, errorMessage: "" },
  imageUrl: { isValid: true, errorMessage: "" },
  discount: { isValid: true, errorMessage: "" },
  transmission: { isValid: true, errorMessage: "" },
  formIsValid: true,
};

const CarForm = () => {
  const { addCar } = useContext(CarContext);
  const [formData, setFormData] = useState(initialFormData);
  const [validation, setValidation] = useState(initialValidationState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidation((prev) => ({ ...prev, [name]: { isValid: true, errorMessage: "" }, formIsValid: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const updatedValidation = { ...validation };

    if (!formData.brand.trim()) {
      updatedValidation.brand = { isValid: false, errorMessage: "Brand is required" };
      isValid = false;
    }

    if (!formData.model.trim()) {
      updatedValidation.model = { isValid: false, errorMessage: "Model is required" };
      isValid = false;
    }

    if (!formData.year.trim()) {
      updatedValidation.year = { isValid: false, errorMessage: "Year is required" };
      isValid = false;
    }

    if (!formData.basePrice.trim()) {
      updatedValidation.basePrice = { isValid: false, errorMessage: "Base Price is required" };
      isValid = false;
    }

    if (!formData.mileage.trim()) {
      updatedValidation.mileage = { isValid: false, errorMessage: "Mileage is required" };
      isValid = false;
    }

    if (!formData.imageUrl.trim()) {
      updatedValidation.imageUrl = { isValid: false, errorMessage: "Image URL is required" };
      isValid = false;
    }

    if (!formData.discount.trim()) {
      updatedValidation.discount = { isValid: false, errorMessage: "Discount is required" };
      isValid = false;
    }

    if (!formData.transmission.trim()) {
      updatedValidation.transmission = { isValid: false, errorMessage: "Transmission is required" };
      isValid = false;
    }

    setValidation({ ...updatedValidation, formIsValid: isValid });

    if (isValid) {
      const car = {
        ...formData,
        color: formData.color === "other" ? formData.otherColor : formData.color,
      };

      fetch(`${API_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(car),
      })
        .then((response) => response.json())
        .then((createdCar) => {
          addCar(createdCar);
        });

      setFormData(initialFormData);
    } else {
      console.error("Error: All fields are required");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleChange}
        error={!validation.brand.isValid}
        helperText={!validation.brand.isValid && validation.brand.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        error={!validation.model.isValid}
        helperText={!validation.model.isValid && validation.model.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        label="Year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        error={!validation.year.isValid}
        helperText={!validation.year.isValid && validation.year.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        label="Base Price"
        name="basePrice"
        value={formData.basePrice}
        onChange={handleChange}
        error={!validation.basePrice.isValid}
        helperText={!validation.basePrice.isValid && validation.basePrice.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        label="Mileage"
        name="mileage"
        value={formData.mileage}
        onChange={handleChange}
        error={!validation.mileage.isValid}
        helperText={!validation.mileage.isValid && validation.mileage.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        label="Image URL"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        error={!validation.imageUrl.isValid}
        helperText={!validation.imageUrl.isValid && validation.imageUrl.errorMessage}
        fullWidth
        margin="normal"
        />
      {formData.imageUrl && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <img src={formData.imageUrl} alt="Car" style={{ maxWidth: '100%', maxHeight: '200px' }} />
        </Box>
      )}
      <TextField
        label="Discount"
        name="discount"
        value={formData.discount}
        onChange={handleChange}
        error={!validation.discount.isValid}
        helperText={!validation.discount.isValid && validation.discount.errorMessage}
        fullWidth
        margin="normal"
        />
      <TextField
        select
        label="Transmission"
        name="transmission"
        value={formData.transmission}
        onChange={handleChange}
        error={!validation.transmission.isValid}
        helperText={!validation.transmission.isValid && validation.transmission.errorMessage}
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
        value={formData.engine}
        onChange={handleChange}
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
        value={formData.color}
        onChange={handleChange}
        fullWidth
        margin="normal"
        >
        <MenuItem value="black">Black</MenuItem>
        <MenuItem value="white">White</MenuItem>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </TextField>
      {formData.color === "other" && (
        <TextField
        label="Other Color"
        name="otherColor"
        value={formData.otherColor}
        onChange={handleChange}
        fullWidth
        margin="normal"
        />
      )}
      {!validation.formIsValid && <Typography color="error">Please fill out all fields correctly.</Typography>}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Add Car
        </Button>
      </Box>
    </Box>
  );
};

export default CarForm;