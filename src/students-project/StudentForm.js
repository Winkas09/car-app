import React, { useState } from 'react';

const StudentForm = ({ onAddStudent }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateName = (name) => {
    if (name.length < 3) {
      return { isValid: false, errorMessageText: 'Vardas turi būti bent 3 simbolių ilgio' };
    }
    return { isValid: true, errorMessageText: '' };
  };

  const validateAge = (age) => {
    const ageNumber = parseInt(age, 10);
    if (isNaN(ageNumber) || ageNumber < 1) {
      return { isValid: false, errorMessageText: 'Amžius privalo būti teigiamas skaičius arba didesnis už 0' };
    } else if (ageNumber > 100) {
      return { isValid: false, errorMessageText: 'Įvestas amžius yra per didelis' };
    }
    return { isValid: true, errorMessageText: '' };
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 9 || phoneNumberLength > 13) {
      return { isValid: false, errorMessageText: 'Įvestas telefono numeris yra neteisingas' };
    }
    return { isValid: true, errorMessageText: '' };
  };

  const validateEmail = (email) => {
    if (email.length < 8 || !email.includes('@') || !email.includes('.')) {
      return { isValid: false, errorMessageText: 'Įvestas elektroninis paštas yra neteisingas' };
    }
    return { isValid: true, errorMessageText: '' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      setErrorMessage(nameValidation.errorMessageText);
      return;
    }

    const ageValidation = validateAge(age);
    if (!ageValidation.isValid) {
      setErrorMessage(ageValidation.errorMessageText);
      return;
    }

    const phoneNumberValidation = validatePhoneNumber(phoneNumber);
    if (!phoneNumberValidation.isValid) {
      setErrorMessage(phoneNumberValidation.errorMessageText);
      return;
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrorMessage(emailValidation.errorMessageText);
      return;
    }

    const newStudent = { name, age, phoneNumber, email };
    onAddStudent(newStudent);

    setName('');
    setAge('');
    setPhoneNumber('');
    setEmail('');
    setErrorMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;