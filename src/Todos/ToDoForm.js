import React, { useState, useContext } from "react";
import { ToDoContext } from "./ToDoContext";
import { API_URL } from "../api-project/Config";
import styles from "./ToDoForm.module.css";

const initialInputState = {
  title: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
  description: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
  dueDate: {
    value: "",
    isValid: true,
    errorMessage: "",
  },
};

const ToDoForm = () => {
  const [formInput, setFormInput] = useState(initialInputState);
  const { title, description, dueDate } = formInput;
  const { addTodo } = useContext(ToDoContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInput((prev) => {
      const input = { ...prev[name] };
      input.value = value;
      if (!value.trim()) {
        input.isValid = false;
        input.errorMessage = `${name} is required`;
      } else {
        input.isValid = true;
        input.errorMessage = "";
      }
      const newState = { ...prev };
      newState[name] = input;
      return newState;
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let isValid = true;

    if (!title.value.trim()) {
      setFormInput((prev) => ({
        ...prev,
        title: { ...prev.title, isValid: false, errorMessage: "Title is required" },
      }));
      isValid = false;
    } else {
      setFormInput((prev) => ({
        ...prev,
        title: { ...prev.title, isValid: true, errorMessage: "" },
      }));
    }

    if (!description.value.trim()) {
      setFormInput((prev) => ({
        ...prev,
        description: { ...prev.description, isValid: false, errorMessage: "Description is required" },
      }));
      isValid = false;
    } else {
      setFormInput((prev) => ({
        ...prev,
        description: { ...prev.description, isValid: true, errorMessage: "" },
      }));
    }

    if (!dueDate.value) {
      setFormInput((prev) => ({
        ...prev,
        dueDate: { ...prev.dueDate, isValid: false, errorMessage: "Due Date is required" },
      }));
      isValid = false;
    } else {
      setFormInput((prev) => ({
        ...prev,
        dueDate: { ...prev.dueDate, isValid: true, errorMessage: "" },
      }));
    }

    if (isValid) {
      const newTodo = {
        id: String(Math.random()), // Ensure the id is a string
        title: title.value,
        description: description.value,
        dueDate: dueDate.value,
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

      setFormInput(initialInputState);
    } else {
      console.error("Error: All fields are required");
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.todoForm}>
      <label
        htmlFor="title"
        className={`${styles.formLabel} ${!title.isValid ? styles.invalidLabel : ''}`}
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={title.value}
        onChange={handleInputChange}
        className={`${styles.formInput} ${!title.isValid ? styles.invalidInput : ''}`}
      />
      {!title.isValid && <p className={styles.errorMessage}>{title.errorMessage}</p>}

      <label
        htmlFor="description"
        className={`${styles.formLabel} ${!description.isValid ? styles.invalidLabel : ''}`}
      >
        Description
      </label>
      <input
        type="text"
        id="description"
        name="description"
        value={description.value}
        onChange={handleInputChange}
        className={`${styles.formInput} ${!description.isValid ? styles.invalidInput : ''}`}
      />
      {!description.isValid && <p className={styles.errorMessage}>{description.errorMessage}</p>}

      <label
        htmlFor="dueDate"
        className={`${styles.formLabel} ${!dueDate.isValid ? styles.invalidLabel : ''}`}
      >
        Due Date
      </label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        value={dueDate.value}
        onChange={handleInputChange}
        className={`${styles.formInput} ${!dueDate.isValid ? styles.invalidInput : ''}`}
      />
      {!dueDate.isValid && <p className={styles.errorMessage}>{dueDate.errorMessage}</p>}

      <button type="submit" className={styles.formButton}>
        Add To-Do
      </button>
    </form>
  );
};

export default ToDoForm;