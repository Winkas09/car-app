import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarPage from "./CarPage";
import CitiesPage from "./CitiesForm/CitiesPage";
import ToDoPage from "./Todos/ToDoPage";
import "./App.css";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cars" element={<CarPage />} />
      <Route path="/cities" element={<CitiesPage />} />
      <Route path="/todo" element={<ToDoPage />} />
    </Routes> 
    <div>
      {/* <CarPage />
      <CitiesPage />
      <ToDoPage /> */}
    </div>
    </>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/cars">Cars</a></li>
          <li><a href="/cities">Cities</a></li>
          <li><a href="/todo">To-Do</a></li>
        </ul>
      </nav>
    </div>
  );
}


export default App;

