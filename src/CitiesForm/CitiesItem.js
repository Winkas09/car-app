// CitiesItem.js
import React, { useContext } from "react";
import { CitiesContext } from "./CitiesContext";
import "./App.css";

const CitiesItem = ({ city, isLastOdd }) => {
  const { removeCity } = useContext(CitiesContext);
  const { id, name, population, location, touristAttractions, isCapital } = city;
  const { continent, country } = location;

  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const formattedAttractions = touristAttractions.map(capitalizeWords);

  return (
    <div className={`city-item ${isLastOdd ? "full-width" : ""}`}>
      <h2>
        {name} {isCapital && "(capital)"}
      </h2>
      <p>
        {name} city is located in {continent}, {country} and has a population of {population}{" "}
        people.
      </p>
      {isCapital && (
        <p>
          {name} is the capital of {country}.
        </p>
      )}
      {formattedAttractions.length > 0 && (
        <p>
          Main Tourist {formattedAttractions.length === 1 ? "attraction" : "attractions"} of {name}{" "}
          {formattedAttractions.length === 1 ? "is" : "are"} {formattedAttractions.join(", ")}.
        </p>
      )}
      <button onClick={() => removeCity(id)}>Remove City</button>
    </div>
  );
};

export default CitiesItem;