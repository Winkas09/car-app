import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { API_URL } from './Config';

const AlbumDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/albums/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setAlbum(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
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
    return <div>Loading...</div>;
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
      <button className='delete-button-api' onClick={handleDelete}>Delete Album</button>
      <Link to="/project/albums">Back to Albums</Link>
    </div>
  );
};

export default AlbumDetailPage;