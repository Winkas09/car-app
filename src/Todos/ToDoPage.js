import React from "react";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { ToDoProvider } from "./ToDoContext";
import { Container } from "@mui/material";

const ToDoPage = () => {
  return (
    <ToDoProvider>
      <Container>
      <div>
        <h2 style={{ textAlign: "center" }}>To-Do List</h2>
        <ToDoForm />
        <ToDoList />
      </div>
      </Container>
    </ToDoProvider>
  );
};

export default ToDoPage;
