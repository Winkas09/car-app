import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';
import { API_URL } from './Config';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const albumResponse = await fetch(`${API_URL}/albums/${id}`);
        if (!albumResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const albumData = await albumResponse.json();
        setAlbum(albumData);

        const userResponse = await fetch(`${API_URL}/users/${albumData.userId}`);
        if (!userResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await userResponse.json();
        setUser(userData);

        const photosResponse = await fetch(`${API_URL}/photos?albumId=${id}&_limit=10`);
        if (!photosResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const photosData = await photosResponse.json();
        setPhotos(photosData);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [id]);

  const handleDelete = () => {
    fetch(`${API_URL}/albums/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/project/albums');
      })
      .catch(error => {
        setError(error);
      });
  };

  if (loading) {
    return <Hourglass wrapperClass='spinner' />;
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
      <p>Album ID: {album.id}</p>
      {user && (
        <div>
          <h2>Author Information</h2>
          <p><strong><Link to={`/project/users/${user.id}`}>{user.name}</Link></strong></p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
        </div>
      )}
      <button onClick={handleDelete}>Delete Album</button>
      <Link to="/project/albums">Back to Albums</Link>
      {photos.length > 0 && (
        <div>
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
      )}
    </div>
  );
};

export default AlbumDetailPage;