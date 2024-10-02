import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectPostsPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Posts list:</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/project/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPostsPage;