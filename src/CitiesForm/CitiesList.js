import React from "react";
import CitiesItem from "./CitiesItem";

const CitiesList = ({ cities }) => {
  const isOdd = cities.length % 2 !== 0;

  return (
    <div className="cities-list">
      {cities.map((city, index) => (
        <CitiesItem key={index} city={city} isLastOdd={isOdd && index === cities.length - 1} />
      ))}
    </div>
  );
};

export default CitiesList;
