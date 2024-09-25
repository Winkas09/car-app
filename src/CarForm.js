import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const CarForm = ({ addCar }) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    engine: "petrol",
    basePrice: 0,
    mileage: 0,
    color: "black",
    otherColor: "",
    imageUrl: "",
    discount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const car = {
      ...formData,
      color: formData.color === "other" ? formData.otherColor : formData.color,
    };
    addCar(car);
    setFormData({
      brand: "",
      model: "",
      year: "",
      engine: "petrol",
      basePrice: "",
      mileage: 0,
      color: "black",
      otherColor: "",
      imageUrl: "",
      discount: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />
      </label>
      <label>
        Model:
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
      </label>
      <label>
        Year:
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          required
        />
      </label>
      <label>
        Engine:
        <select name="engine" value={formData.engine} onChange={handleChange}>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="diesel">Diesel</option>
          <option value="petrol">Petrol</option>
        </select>
      </label>
      <label>
        Base Price:
        <input
          type="number"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="Base Price"
          required
        />
      </label>
      <label>
        Mileage:
        <input
          type="number"
          name="mileage"
          value={formData.mileage}
          onChange={handleChange}
          placeholder="Mileage"
          required
        />
      </label>
      <label>
        Color:
        <select name="color" value={formData.color} onChange={handleChange}>
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="silver">Silver</option>
          <option value="white">White</option>
          <option value="special blue">Special Blue</option>
          <option value="other">Other</option>
        </select>
      </label>
      {formData.color === "other" && (
        <label>
          Enter Color:
          <input
            type="text"
            name="otherColor"
            value={formData.otherColor}
            onChange={handleChange}
            placeholder="Enter Color"
            required
          />
        </label>
      )}
      <label>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
      </label>
      <label>
        Discount:
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          placeholder="Discount"
        />
      </label>
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
