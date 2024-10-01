import React from 'react';

const ProjectHomePage = () => {
  return (
    <div>
      <h1>Welcome to the Project Home Page</h1>
      <p>Select a category to view details:</p>
      <ul>
        <li><a href="/project/users">Users</a></li>
        <li><a href="/project/posts">Posts</a></li>
        <li><a href="/project/albums">Albums</a></li>
      </ul>
    </div>
  );
};

export default ProjectHomePage;