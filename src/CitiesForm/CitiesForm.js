import React, { useState } from "react";

const CitiesForm = ({ addCity }) => {
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [touristAttractions, setTouristAttractions] = useState("");
  const [isCapital, setIsCapital] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const attractionsArray = touristAttractions
      .split(",")
      .map((attraction) => attraction.trim())
      .filter((attraction) => attraction.length > 0);

    const newCity = {
      name,
      population: Number(population),
      location: {
        continent,
        country,
      },
      touristAttractions: attractionsArray,
      isCapital,
    };
    addCity(newCity);
    setName("");
    setPopulation("");
    setContinent("");
    setCountry("");
    setTouristAttractions("");
    setIsCapital(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="City Name"
        required
      />
      <input
        type="number"
        value={population}
        onChange={(e) => setPopulation(e.target.value)}
        placeholder="Population"
        required
      />
      <input
        type="text"
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
        placeholder="Continent"
        required
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        required
      />
      <input
        type="text"
        value={touristAttractions}
        onChange={(e) => setTouristAttractions(e.target.value)}
        placeholder="Attractions, separated by commas"
      />
      <label>
        <input
          type="checkbox"
          checked={isCapital}
          onChange={(e) => setIsCapital(e.target.checked)}
        />
        Is Capital
      </label>
      <button type="submit">Add City</button>
    </form>
  );
};

export default CitiesForm;
