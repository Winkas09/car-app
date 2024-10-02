import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h1>Users list:</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/project/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectUsersPage;