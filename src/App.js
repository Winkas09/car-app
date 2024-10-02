// import { Routes, Route } from "react-router-dom";
// import CarPage from "./CarPage";
// import CitiesPage from "./CitiesForm/CitiesPage";
// import ToDoPage from "./Todos/ToDoPage";
// import "./App.css";
// import PageHeader from "./PageHeader.js";

// function App() {
//   return (
//     <>

//     <PageHeader />

//     <Routes>
//       <Route path="/cars" element={<CarPage />} />
//       <Route path="/cities" element={<CitiesPage />} />
//       <Route path="/todo" element={<ToDoPage />} />
//     </Routes> 
//     <div>
//       {/* <CarPage />
//       <CitiesPage />
//       <ToDoPage /> */}
//     </div>
//     </>
//   );
// }

// function HomePage() {
//   return (
//     <div>
//       <h1>Home Page</h1>
//       <nav>
//         <ul>
//           <li><a href="/">Home</a></li>
//           <li><a href="/cars">Cars</a></li>
//           <li><a href="/cities">Cities</a></li>
//           <li><a href="/todo">To-Do</a></li>
//         </ul>
//       </nav>
//     </div>
//   );
// }


// export default App;

import { Routes, Route } from "react-router-dom";
import CarPage from "./CarPage";
import CitiesPage from "./CitiesForm/CitiesPage";
import ToDoPage from "./Todos/ToDoPage";
import ProjectHomePage from "./api-project/ProjectHomePage";
import ProjectUsersPage from "./api-project/ProjectUsersPage";
import ProjectPostsPage from "./api-project/ProjectPostsPage";
import ProjectAlbumsPage from "./api-project/ProjectAlbumsPage";
import UserDetailPage from "./api-project/UserDetailPage";
import PostDetailPage from "./api-project/PostDetailPage";
import AlbumDetailPage from "./api-project/AlbumDetailPage";
import "./App.css";
import PageHeader from "./PageHeader.js";
import HomePage from "./HomePage.js";

function App() {
  return (
    <>
      <PageHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/todo" element={<ToDoPage />} />
        <Route path="/project" element={<ProjectHomePage />} />
        <Route path="/project/users" element={<ProjectUsersPage />} />
        <Route path="/project/users/:id" element={<UserDetailPage />} />
        <Route path="/project/posts" element={<ProjectPostsPage />} />
        <Route path="/project/posts/:id" element={<PostDetailPage />} />
        <Route path="/project/albums" element={<ProjectAlbumsPage />} />
        <Route path="/project/albums/:id" element={<AlbumDetailPage />} />
      </Routes>
    </>
  );
}

export default App;