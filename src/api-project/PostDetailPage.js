import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch post details
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(userData => {
        setUser(userData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    // Fetch comments for the post
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments?_limit=10`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setComments(data);
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
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
  );
};

export default PostDetailPage;