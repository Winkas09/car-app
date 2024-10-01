import ApiPage from './ApiPage';

const ProjectAlbumsPage = () => {
  return <ApiPage apiEndpoint="https://jsonplaceholder.typicode.com/albums" title="Albums" type="album" />;
};

export default ProjectAlbumsPage;


// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const ProjectAlbumsPage = () => {
//     const [albums, setAlbums] = useState([]);

//     useEffect(() => {
//         fetch('https://jsonplaceholder.typicode.com/albums')
//             .then(res => res.json())
//             .then(data => setAlbums(data));
//     }, []);

//     return (
//         <div>
//             <h1>Albums list:</h1>
//             <ul>
//                 {albums.map(album => (
//                     <li key={album.id}>
//                         <Link to={`/api/project/albums/${album.id}`}>{album.title}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ProjectAlbumsPage;