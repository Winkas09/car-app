import React from 'react';
import StudentItem from './StudentItem';
import styles from './StudentList.module.css';


const StudentList = ({ students, deleteStudent, editStudent }) => {
  return (
    <div>
      <h2>Student List</h2>
      <ul className={styles.list}>
      {students.map(student => (
        <StudentItem
          key={student.id}
          student={student}
          onDelete={deleteStudent}
          onEdit={editStudent}
        />
      ))}
    </ul>
    </div>
  );
};

export default StudentList;