// CitiesContext.js
import React, { createContext, useReducer, useEffect } from "react";
import { API_URL } from "../api-project/Config";
import { citiesReducer } from "./CitiesReducer";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, dispatch] = useReducer(citiesReducer, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${API_URL}/cities`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dispatch({ type: 'SET_CITIES', payload: data });
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

      const addedCity = await response.json();
      dispatch({ type: 'ADD_CITY', payload: addedCity });
    } catch (error) {
      console.error("Error adding city:", error);
    }
  };

  const removeCity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to remove city");
      }

      dispatch({ type: 'REMOVE_CITY', payload: id });
    } catch (error) {
      console.error("Error removing city:", error);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };