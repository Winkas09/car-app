import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './Config';

const ProjectPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className='post-list'>
      <h1>Posts list:</h1>
      <Link to="/project/create-post">Create a new post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.id}. <Link to={`/project/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPostsPage;