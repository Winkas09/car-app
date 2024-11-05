// CitiesPage.js
import React, { useContext } from "react";
import CitiesList from "./CitiesList";
import CitiesForm from "./CitiesForm";
import "./App.css";
import { CitiesContext, CitiesProvider } from "./CitiesContext";

const CitiesPage = () => {
  const { cities, addCity } = useContext(CitiesContext);

  return (
    <div className="cities-page">
      <h1 className="cities-page-title">Cities Page</h1>
      <CitiesForm addCity={addCity} />
      <CitiesList cities={cities} />
    </div>
  );
};

const CitiesPageWithProvider = () => (
  <CitiesProvider>
    <CitiesPage />
  </CitiesProvider>
);

export default CitiesPageWithProvider;