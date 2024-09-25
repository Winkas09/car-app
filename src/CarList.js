import CarItem from "./CarItem";

const CarList = ({ cars }) => {
  return (
    <div>
      {cars.map((car, index) => (
        <CarItem key={index} car={car} />
      ))}
    </div>
  );
};

export default CarList;
