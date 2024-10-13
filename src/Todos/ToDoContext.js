import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../api-project/Config";


const ToDoContext = createContext();

const ToDoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    fetch(`${API_URL}/todos`)
        .then(res => res.json())
        .then(data => setTodos(data))
}, [])

  const addTodo = (todo) => {
    setTodos((todos) => [todo, ...todos]);
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    })
    .catch(error => {
      console.error('There was a problem with the delete request:', error);
    });
  };
  
  const toggleDone = (id) => {
    setTodos((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], done: !updatedTodos[index].done };
        
        fetch(`${API_URL}/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodos[index]),
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
        })
        .catch(error => {
          console.error('There was a problem with the update request:', error);
        });
  
        return updatedTodos;
      }
      return todos;
    });
  };
  
  const editTodo = (id, newTitle, newDescription) => {
    setTodos((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        const updatedTodos = [...todos];
        updatedTodos[index] = { ...updatedTodos[index], title: newTitle, description: newDescription };
        
        fetch(`${API_URL}/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTodos[index]),
        })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
        })
        .catch(error => {
          console.error('There was a problem with the update request:', error);
        });
  
        return updatedTodos;
      }
      return todos;
    });
  };
  
  return (
    <ToDoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone, editTodo }}>
      {children}
    </ToDoContext.Provider>
  );

};

export { ToDoContext, ToDoProvider };
