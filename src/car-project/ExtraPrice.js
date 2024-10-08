const ExtraPrice = (engine, color, transmission) => {
  let enginePrice = 0;
  let colorPrice = 0;
  let transmissionPrice = 0;

  switch (engine) {
    case "electric":
      enginePrice += 10000;
      break;
    case "hybrid":
      enginePrice += 7500;
      break;
    case "diesel":
      enginePrice += 5000;
      if (transmission === "automatic") {
        transmissionPrice += 2000;
      } else if (transmission === "manual") {
        transmissionPrice += 1000;
      }
      break;
    case "petrol":
      enginePrice += 2000;
      if (transmission === "automatic") {
        transmissionPrice += 2000;
      } else if (transmission === "manual") {
        transmissionPrice += 1000;
      }
      break;
    default:
      break;
  }

  if (color === "special blue") {
    colorPrice += 500;
  } else if (color !== "black") {
    colorPrice += 3000;
  }

  const totalExtraPrice = enginePrice + colorPrice + transmissionPrice;

  console.log(`Engine Price: ${enginePrice}€`);
  console.log(`Color Price: ${colorPrice}€`);
  console.log(`Transmission Price: ${transmissionPrice}€`);
  console.log(`Total Extra Price: ${totalExtraPrice}€`);

  return {
    enginePrice,
    colorPrice,
    transmissionPrice,
    totalExtraPrice,
  };
};

export default ExtraPrice;
