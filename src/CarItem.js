import React from "react";
import ExtraPrice from "./ExtraPrice";
import CarDiscount from "./CarDiscount";
import "./App.css"; // Import the CSS file

const CarItem = ({ car }) => {
  const basePrice = parseFloat(car.basePrice);
  const extraPrice = ExtraPrice(car.engine, car.color, car.transmission);
  const discount = CarDiscount(car.mileage, car.discount, car.year, basePrice);

  // Ensure final price is calculated with numbers only
  const finalPrice = basePrice + extraPrice - discount; // naudojau car.basePrice vietoj basePrice :))))))))))))))))

  const vat = finalPrice * 0.21;
  const finalPriceWithVAT = finalPrice + vat;

  console.log(`Base Price: ${basePrice}€`);
  console.log(`Extra Price: ${extraPrice}€`);
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
      <p>2.1. Variklio tipas: {car.engine}</p>
      <p>2.2. Spalva: {car.color}</p>
      <p>2.3. Viso už papildomas paslaugas: {extraPrice}€</p>
      <p>3. Kainos sumažėjimas:</p>
      <p>3.1. Dėl kilometražo: {CarDiscount(car.mileage, 0, car.year, basePrice)}€</p>
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
