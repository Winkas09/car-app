import React from "react";
import calculateExtraPrice from "./ExtraPrice";
import carDiscount from "./CarDiscount";
import "./App.css";

const CarItem = ({ car }) => {
  const basePrice = parseFloat(car.basePrice);
  const { enginePrice, colorPrice, transmissionPrice, totalExtraPrice } = calculateExtraPrice(
    car.engine,
    car.color,
    car.transmission
  );
  const discount = carDiscount(car.mileage, car.discount, car.year, basePrice);

  const finalPrice = basePrice + totalExtraPrice - discount;
  const vat = finalPrice * 0.21;
  const finalPriceWithVAT = finalPrice + vat;

  console.log(`Base Price: ${basePrice}€`);
  console.log(`Engine Price: ${enginePrice}€`);
  console.log(`Color Price: ${colorPrice}€`);
  console.log(`Transmission Price: ${transmissionPrice}€`);
  console.log(`Total Extra Price: ${totalExtraPrice}€`);
  console.log(`Discount: ${discount}€`);
  console.log(`Final Price: ${finalPrice}€`);
  console.log(`VAT: ${vat}€`);
  console.log(`Final Price with VAT: ${finalPriceWithVAT}€`);

  return (
    <div className="car-item">
      <h3>
        {car.brand} {car.model} ({car.year})
      </h3>
      <p>Automobilio kaina:</p>
      <ul>
        <li>Bazinė kaina: {basePrice}€</li>
        <li>Papildomos paslaugos:
          <ul>
            <li>Variklio tipas: {car.engine} ({enginePrice}€)</li>
            <li>Spalva: {car.color} ({colorPrice}€)</li>
            <li>Transmisija: {car.transmission} ({transmissionPrice}€)</li>
            <li>Viso už papildomas paslaugas: {totalExtraPrice}€</li>
          </ul>
        </li>
        <li>Kainos sumažėjimas:
          <ul>
            <li>Dėl kilometražo: {carDiscount(car.mileage, 0, car.year, basePrice)}€</li>
            <li>Nuolaida: {car.discount}€</li>
            <li>Viso kainos sumažėjimas: {discount}€</li>
          </ul>
        </li>
        <li>Galutinė kaina: {finalPrice}€</li>
        <li>PVM (21%): {vat}€</li>
        <li>Galutinė kaina su PVM: {finalPriceWithVAT}€</li>
      </ul>
      {car.imageUrl && <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />}
    </div>
  );
};

export default CarItem;
