const ExtraPrice = (engine, color, transmission) => {
  let extraPrice = 0;

  switch (engine) {
    case "electric":
      extraPrice += 10000;
      break;
    case "hybrid":
      extraPrice += 7500;
      break;
    case "diesel":
      extraPrice += 5000;
      if (transmission === "automatic") {
        extraPrice += 2000;
      } else if (transmission === "manual") {
        extraPrice += 1000;
      }
      break;
    case "petrol":
      if (transmission === "automatic") {
        extraPrice += 2000;
      } else if (transmission === "manual") {
        extraPrice += 1000;
      }
      break;
    default:
      break;
  }

  if (color === "special blue") {
    extraPrice += 500;
  } else if (color !== "black") {
    extraPrice += 3000;
  }

  console.log(`Extra Price: ${extraPrice}€`);

  return extraPrice;
};

export default ExtraPrice;
