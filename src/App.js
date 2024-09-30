import { Routes, Route } from "react-router-dom";
import "./App.css";
import CarPage from "./CarPage";

function App() {
  return (
    <>

    <Routes>
      <Route path="/cars" element={<CarPage />} />
    </Routes> 
    <div>
      <CarPage />
      <CitiesPage />
    </div>
    </>
  );
}

export default App;

