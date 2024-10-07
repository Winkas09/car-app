import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { API_URL } from './Config';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { title, body, user, comments } = data;

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}?_embed=comments&_embed=user`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/project/posts');
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <Hourglass wrapperClass='spinner' />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No post found</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      {user && (
        <div>
          <h2>Author Information</h2>
          <p><strong><Link to={`/project/users/${user.id}`}>{user.name}</Link></strong></p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: <a href={`http://${user.website}`} target="_blank" >{user.website}</a></p>
        </div>
      )}
      <Link to="/project/posts">Back to Posts List</Link>
      <button className='delete-button-api' onClick={handleDelete}>Delete Post</button>
      {comments && comments.length > 0 && (
        <div>
          <h2>Comments</h2>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>
                <p><strong>{comment.name}</strong> ({comment.email})</p>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetailPage;