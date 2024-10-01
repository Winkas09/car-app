import ApiPage from './ApiPage';

const ProjectPostsPage = () => {
  return <ApiPage apiEndpoint="https://jsonplaceholder.typicode.com/posts" title="Posts" type="post" />;
};

export default ProjectPostsPage;


// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ProjectPostsPage = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             .then(res => res.json())
//             .then(data => setPosts(data));
//     }, []);

//     return (
//         <div>
//             <h1>Posts list:</h1>
//             <ul>
//                 {posts.map(post => (
//                     <li key={post.id}>
//                         <Link to={`/api/project/posts/${post.id}`}>{post.title}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProjectPostsPage;