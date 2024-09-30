import ToDoItem from "./ToDoItem";
import React, { useContext } from "react";
import { ToDoContext } from "./ToDoContext";

const ToDoList = () => {
  const { todos } = useContext(ToDoContext);

  if (!todos) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default ToDoList;
