const CarDiscount = (mileage, discount, year, basePrice) => {
  let discountAmount = 0;

  // Discount based on mileage
  if (mileage > 400000) {
    discountAmount += basePrice * 0.5;
  } else if (mileage > 100000) {
    discountAmount += basePrice * 0.3;
  } else if (mileage > 50000) {
    discountAmount += basePrice * 0.2;
  } else if (mileage > 20000) {
    discountAmount += basePrice * 0.15;
  } else if (mileage > 0) {
    discountAmount += basePrice * 0.1;
  }

  // Add the fixed discount amount
  discountAmount += parseFloat(discount);

  console.log(`Mileage Discount: ${discountAmount - parseFloat(discount)}€`);
  console.log(`Fixed Discount: ${parseFloat(discount)}€`);
  console.log(`Total Discount: ${discountAmount}€`);

  return discountAmount;
};

export default CarDiscount;
