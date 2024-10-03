import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { title, body, user, comments } = data;

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}?_embed=comments&_embed=user`)
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

  if (loading) {
    return <div>Loading...</div>;
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
          <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>
      )}
      <Link to="/project/posts">Back to Posts List</Link>
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