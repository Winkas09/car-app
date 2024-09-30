import React, { useContext } from "react";
import { ToDoContext } from "./ToDoContext";

const ToDoItem = ({ todo }) => {
  const { id, title, description, dueDate, creationDate, done } = todo;
  const { deleteTodo, toggleDone } = useContext(ToDoContext);

  const remainingTime = () => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (diff <= 0) {
      return "Time's up";
    } else if (days > 0) {
      return `${days} days left`;
    } else {
      return `${hours} hours left`;
    }
  };

  return (
    <li className={`todo-item ${done ? "done" : ""}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Due date: {new Date(dueDate).toLocaleDateString()}</p>
      <p>Created on: {new Date(creationDate).toLocaleDateString()}</p>
      <p>{remainingTime()}</p>
      <button onClick={() => toggleDone(id)}>{done ? "Undo" : "Done"}</button>
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </li>
  );
};

export default ToDoItem;
