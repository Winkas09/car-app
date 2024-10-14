import ToDoItem from "./ToDoItem";
import React, { useContext } from "react";
import { ToDoContext } from "./ToDoContext";
import { Hourglass } from "react-loader-spinner";
import styles from "./ToDoList.module.css";

const ToDoList = () => {
  const { todos } = useContext(ToDoContext);

  if (!todos) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Hourglass
          height="80"
          width="80"
          color="blue"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <ToDoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default ToDoList;