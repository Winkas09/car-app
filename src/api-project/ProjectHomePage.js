import React from 'react';
import { Link } from 'react-router-dom';

const ProjectHomePage = () => {
  return (
    <div className='home-nav'>
      <h1>Welcome to the Project Home Page</h1>
      <p>Select a category to view details:</p>
      <ul>
        <li><Link to="/project/users">Users</Link></li>
        <li><Link to="/project/posts">Posts</Link></li>
        <li><Link to="/project/albums">Albums</Link></li>
      </ul>
    </div>
  );
};

export default ProjectHomePage;