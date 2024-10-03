import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InfinitySpin } from 'react-loader-spinner';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Username: {user.username}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      <h3>Address</h3>
      <p>{user.address.street}, {user.address.suite}</p>
      <p>{user.address.city}, {user.address.zipcode}</p>
      <h3>Company</h3>
      <p>{user.company.name}</p>
      <p>{user.company.catchPhrase}</p>
      <p>{user.company.bs}</p>
      <Link to="/project/users">Back to Users List</Link>
    </div>
  );
};

export default UserDetailPage;