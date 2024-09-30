import React, { createContext, useState } from "react";

const ToDoContext = createContext();

const ToDoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((todos) => [todo, ...todos]);
  };

  const deleteTodo = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    setTodos((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], done: !updatedTodos[index].done };
        return updatedTodos;
      }
      return todos;
    });
  };

  return (
    <ToDoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone }}>
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };
