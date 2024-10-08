import React from 'react';

const StudentItem = ({ student, onDelete }) => {
  return (
    <li>
      <p>Name: {student.name}</p>
      <p>Age: {student.age}</p>
      <p>Phone Number: {student.phoneNumber}</p>
      <p>Email: {student.email}</p>
      <button onClick={() => onDelete(student)}>Delete</button>
    </li>
  );
};

export default StudentItem;