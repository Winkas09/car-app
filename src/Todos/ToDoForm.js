import React, { useState, useContext } from "react";
import { ToDoContext } from "./ToDoContext";
import { API_URL } from "../api-project/Config";
import styles from "./ToDoForm.module.css";

const ToDoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useContext(ToDoContext);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [dueDateIsValid, setDueDateIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleIsValid(false);
      isValid = false;
    } else {
      setTitleIsValid(true);
    }

    if (!description.trim()) {
      setDescriptionIsValid(false);
      isValid = false;
    } else {
      setDescriptionIsValid(true);
    }

    if (!dueDate) {
      setDueDateIsValid(false);
      isValid = false;
    } else {
      setDueDateIsValid(true);
    }
      if (isValid) {
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
      <label htmlFor="title"
       className={`${styles.formLabel} ${!titleIsValid ? styles.invalidLabel : ''}`}>
        Title
      </label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`${styles.formInput} ${!titleIsValid ? styles.invalidInput : ''}`}
      />
      {!titleIsValid && <span className={styles.errorMessage}>Title is required</span>}

      <label htmlFor="description"
       className={`${styles.formLabel} ${!descriptionIsValid ? styles.invalidLabel : ''}`}>
        Description
      </label>
      <input
        type="text"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`${styles.formInput} ${!descriptionIsValid ? styles.invalidInput : ''}`}
      />
      {!descriptionIsValid && <span className={styles.errorMessage}>Description is required</span>}
      <label htmlFor="dueDate"
       className={`${styles.formLabel} ${!dueDateIsValid ? styles.invalidLabel: ''}`}>
        Due Date
      </label>
      <input
        type="date"
        id="dueDate"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={`${styles.formInput} ${!dueDateIsValid ? styles.invalidInput : ''}`}
      />
      {!dueDateIsValid && <span className={styles.errorMessage}>Due Date is required</span>}
      <button type="submit" className={styles.formButton}>
        Add To-Do
      </button>
    </form>
  );
};

export default ToDoForm;