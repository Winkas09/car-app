import React, { useState } from 'react';
import styles from './StudentItem.module.css';

const StudentItem = ({ student, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...student });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSubmit = () => {
    onEdit(editFormData);
    setIsEditing(false);
  };

  return (
    <li className={styles.studentItem}>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            className={styles.editInput}
          />
          <input
            type="text"
            name="age"
            value={editFormData.age}
            onChange={handleEditChange}
            className={styles.editInput}
          />
          <input
            type="text"
            name="phoneNumber"
            value={editFormData.phoneNumber}
            onChange={handleEditChange}
            className={styles.editInput}
          />
          <input
            type="text"
            name="email"
            value={editFormData.email}
            onChange={handleEditChange}
            className={styles.editInput}
          />
          <button onClick={handleEditSubmit} className={styles.button}>Save</button>
          <button onClick={() => setIsEditing(false)} className={styles.button}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Phone Number: {student.phoneNumber}</p>
          <p>Email: {student.email}</p>
          <button className='delete-student' onClick={() => onDelete(student)}>Delete</button>
          <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
        </div>
      )}
    </li>
  );
};

export default StudentItem;