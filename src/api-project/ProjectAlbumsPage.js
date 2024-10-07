import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from './Config';

const ProjectAlbumsPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/albums`)
      .then(res => res.json())
      .then(data => setAlbums(data));
  }, []);

  return (
    <div>
      <h1>Albums list:</h1>
      <Link to="/project/create-album">Create a new album</Link>
      <ul>
        {albums.map(album => (
          <li key={album.id}>
            {album.id}. <Link to={`/project/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectAlbumsPage;