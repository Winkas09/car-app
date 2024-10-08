import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedStudents = loadStudentsFromLocalStorage();
    setStudents(storedStudents);
  }, []);

  const addStudent = (student) => {
    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    saveStudentsToLocalStorage(updatedStudents);
  };

  const deleteStudent = (studentToDelete) => {
    const updatedStudents = students.filter(student => student !== studentToDelete);
    setStudents(updatedStudents);
    saveStudentsToLocalStorage(updatedStudents);
  };

  const saveStudentsToLocalStorage = (students) => {
    localStorage.setItem('students', JSON.stringify(students));
  };

  const loadStudentsFromLocalStorage = () => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm onAddStudent={addStudent} />
      <StudentList students={students} onDelete={deleteStudent} />
    </div>
  );
};

export default StudentPage;