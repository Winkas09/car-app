import React, { useState } from 'react';

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
    <li>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            name="age"
            value={editFormData.age}
            onChange={handleEditChange}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            name="phoneNumber"
            value={editFormData.phoneNumber}
            onChange={handleEditChange}
            style={{ marginRight: '10px' }}
          />
          <input
            type="text"
            name="email"
            value={editFormData.email}
            onChange={handleEditChange}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleEditSubmit} style={{ marginRight: '10px' }}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>
          <p>Phone Number: {student.phoneNumber}</p>
          <p>Email: {student.email}</p>
          <button className='delete-student' onClick={() => onDelete(student)}>Delete</button>
          <button onClick={() => setIsEditing(true)} style={{ marginLeft: '10px' }}>Edit</button>
        </div>
      )}
    </li>
  );
};

export default StudentItem;