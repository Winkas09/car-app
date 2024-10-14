import React, { useState, useContext } from "react";
import { ToDoContext } from "./ToDoContext";
import { API_URL } from "../api-project/Config";
import styles from "./ToDoForm.module.css";

const ToDoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useContext(ToDoContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim() && dueDate) {
      const newTodo = {
        id: Math.random(),
        title,
        description,
        dueDate,
        creationDate: new Date().toLocaleDateString(),
        done: false,
      };


      fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((response) => response.json())
        .then((createdTodo) => {
          addTodo(createdTodo);
        });

      setTitle("");
      setDescription("");
      setDueDate("");
    } else {
      console.error("Error: All fields are required");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.todoForm}>
      <label htmlFor="title" className={styles.formLabel}>
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.formInput}
      />
      <label htmlFor="description" className={styles.formLabel}>
        Description
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.formInput}
      />
      <label htmlFor="dueDate" className={styles.formLabel}>
        Due Date
      </label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={styles.formInput}
      />
      <button type="submit" className={styles.formButton}>
        Add To-Do
      </button>
    </form>
  );
};

export default ToDoForm;