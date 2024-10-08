import React from 'react';
import StudentItem from './StudentItem';

const StudentList = ({ students, onDelete }) => {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <StudentItem key={index} student={student} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;