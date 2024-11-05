import React, { createContext, useReducer, useEffect } from "react";
import { API_URL } from "../api-project/Config";
import { todoReducer } from "./ToDoReducer";

const ToDoContext = createContext();

const ToDoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_TODOS', payload: data }));
  }, []);

  const addTodo = (todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const deleteTodo = (id) => {
    fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        dispatch({ type: 'DELETE_TODO', payload: id });
      })
      .catch(error => {
        console.error('There was a problem with the delete request:', error);
      });
  };

  const toggleDone = (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, done: !todo.done };
      fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          dispatch({ type: 'TOGGLE_DONE', payload: id });
        })
        .catch(error => {
          console.error('There was a problem with the update request:', error);
        });
    }
  };

  const editTodo = (id, newTitle, newDescription) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, title: newTitle, description: newDescription };
      fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          dispatch({ type: 'EDIT_TODO', payload: { id, newTitle, newDescription } });
        })
        .catch(error => {
          console.error('There was a problem with the update request:', error);
        });
    }
  };

  return (
    <ToDoContext.Provider value={{ todos, addTodo, deleteTodo, toggleDone, editTodo }}>
      {children}
    </ToDoContext.Provider>
  );
};

export { ToDoContext, ToDoProvider };