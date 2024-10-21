import React, { useState, useEffect } from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import { API_URL } from '../api-project/Config';

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudentsFromAPI();
  }, []);

  const loadStudentsFromAPI = () => {
    fetch(`${API_URL}/students`)
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error('Error fetching students:', error));
  };

  const addStudent = (student) => {
    fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(student),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(newStudent => {
        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
      })
      .catch(error => console.error('Error adding student:', error));
  };

  const deleteStudent = (studentToDelete) => {
    fetch(`${API_URL}/students/${studentToDelete.id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedStudents = students.filter(student => student.id !== studentToDelete.id);
        setStudents(updatedStudents);
      })
      .catch(error => console.error('Error deleting student:', error));
  };

  const editStudent = (updatedStudent) => {
    fetch(`${API_URL}/students/${updatedStudent.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const updatedStudents = students.map(student =>
          student.id === updatedStudent.id ? updatedStudent : student
        );
        setStudents(updatedStudents);
      })
      .catch(error => console.error('Error editing student:', error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Page</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} deleteStudent={deleteStudent} editStudent={editStudent} />
    </div>
  );
};

export default StudentPage;