import React from "react";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";
import { ToDoProvider } from "./ToDoContext";

const ToDoPage = () => {
  return (
    <ToDoProvider>
      <div>
        <h2>To-Do List</h2>
        <ToDoForm />
        <ToDoList />
      </div>
    </ToDoProvider>
  );
};

export default ToDoPage;
