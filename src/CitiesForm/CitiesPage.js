import React, { useState } from "react";
import CitiesList from "./CitiesList";
import CitiesForm from "./CitiesForm";
import "./App.css";

const CitiesPage = () => {
  const [cities, setCities] = useState([]);

  const addCity = (city) => {
    setCities([...cities, city]);
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
