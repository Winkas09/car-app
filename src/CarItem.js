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
      <p>1. Bazinė kaina: {basePrice}€</p>
      <p>2. Papildomos paslaugos:</p>
      <p>
        2.1. Variklio tipas: {car.engine} ({enginePrice}€)
      </p>
      <p>
        2.2. Spalva: {car.color} ({colorPrice}€)
      </p>
      <p>
        2.3. Transmisija: {car.transmission} ({transmissionPrice}€)
      </p>
      <p>2.4. Viso už papildomas paslaugas: {totalExtraPrice}€</p>
      <p>3. Kainos sumažėjimas:</p>
      <p>3.1. Dėl kilometražo: {carDiscount(car.mileage, 0, car.year, basePrice)}€</p>
      <p>3.2. Nuolaida: {car.discount}€</p>
      <p>3.3. Viso kainos sumažėjimas: {discount}€</p>
      <p>4. Galutinė kaina: {finalPrice}€</p>
      <p>5. PVM (21%): {vat}€</p>
      <p>6. Galutinė kaina su PVM: {finalPriceWithVAT}€</p>
      {car.imageUrl && <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} />}
    </div>
  );
};

export default CarItem;
