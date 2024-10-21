import React, { useState } from 'react';
import styles from './StudentForm.module.css';

const StudentForm = ({ addStudent }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    email: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.length <= 3) {
      errors.name = 'Name must be longer than 3 characters and cannot be whitespace.';
    }
    if (formData.age < 18 || formData.age > 100) {
      errors.age = 'Age must be between 18 and 100.';
    }
    const phoneRegex = /^(\+370|8)\d{8}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Phone number must be a valid Lithuanian number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Email must be a valid email address.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      addStudent(formData);
      setFormData({
        name: '',
        age: '',
        phoneNumber: '',
        email: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={validationErrors.name ? styles.errorLabel : ''}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.name ? styles.errorInput : ''}`}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={validationErrors.age ? styles.errorLabel : ''}>Age</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.age ? styles.errorInput : ''}`}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={validationErrors.phoneNumber ? styles.errorLabel : ''}>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.phoneNumber ? styles.errorInput : ''}`}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={validationErrors.email ? styles.errorLabel : ''}>Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.input} ${validationErrors.email ? styles.errorInput : ''}`}
        />
      </div>
      <button type="submit" className={styles.button}>Add Student</button>
      {Object.keys(validationErrors).length > 0 && (
        <span className={styles.errorMessage}>
          {Object.values(validationErrors).join(' ')}
        </span>
      )}
    </form>
  );
};

export default StudentForm;