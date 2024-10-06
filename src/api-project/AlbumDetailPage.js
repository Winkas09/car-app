import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch album details
    fetch(`http://localhost:3000/albums/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setAlbum(data);
        return fetch(`http://localhost:3000/users/${data.userId}`);
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

      fetch(`http://localhost:3000/photos?albumId=${id}&_limit=10`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not oka');
        }
        return res.json();
      })
      .then(data => {
        setPhotos(data);
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);

  if (loading) {
    return <Hourglass  wrapperClass='spinner'  />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!album) {
    return <div>No album found</div>;
  }

  return (
    <div>
      <h1>{album.title}</h1>
      {user && (
        <div>
          <h2>Author Information</h2>
          <p><strong><Link to={`/project/users/${user.id}`}>{user.name}</Link></strong></p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>
      )}
      <Link to="/project/albums">Back to Albums List</Link>
      <h2>Photos</h2>
      <ul>
        {photos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumDetailPage;