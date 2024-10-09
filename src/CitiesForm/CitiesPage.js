import React, { useState, useEffect } from "react";
import CitiesList from "./CitiesList";
import CitiesForm from "./CitiesForm";
import "./App.css";
import { API_URL } from "../api-project/Config";

const CitiesPage = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_URL}/cities`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchCities();
  }, []);

  const addCity = async (city) => {
    try {
      const response = await fetch(`${API_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });

      if (!response.ok) {
        throw new Error("Failed to add city");
      }

      const addedCity = await response.json(); // Parse the response from the API
      setCities([...cities, addedCity]); // Update local state with the new city
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  return (
    <div className="cities-page">
      <h1 className="cities-page-title">Cities Page</h1>
      <CitiesForm addCity={addCity} />
      <CitiesList cities={cities} />
    </div>
  );
};

export default CitiesPage;
