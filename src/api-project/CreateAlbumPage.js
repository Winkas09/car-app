import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from './Config';

const CreateAlbumPage = () => {
    const [selectedUser, setSelectedUser] = useState('empty');
    const [title, setTitle] = useState('');
    const [users, setUsers] = useState([]);
    const [createdAlbum, setAlbumCreated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const userHandler = event => setSelectedUser(event.target.value);
    const titleHandler = event => setTitle(event.target.value);

    const submitHandler = event => {
        event.preventDefault();

        if (selectedUser === 'empty') {
            alert('Please select a user');
            return;
        }

        const newAlbum = {
            title,
            userId: parseInt(selectedUser, 10)
        };

        console.log(newAlbum);

        fetch(`${API_URL}/albums`, {
            method: 'POST',
            body: JSON.stringify(newAlbum),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
           .then(res => {
                if (!res.ok) {
                     console.error(`Network response was not ok: ${res.status} ${res.statusText}`);
                     throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
                }
                return res.json();
              })

            .then(data => {
                setAlbumCreated(data);
                navigate(`/project/albums/${data.id}`);
            }
            )
            .catch(error => console.error('Error creating album:', error));

    };

    return (
        <div>
            <h1>Create Album</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="user">User:</label>
                    <select id="user" value={selectedUser} onChange={userHandler}>
                        <option value="empty">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={titleHandler}
                    />
                </div>
                <button type="submit">Create Album</button>
            </form>
            {createdAlbum && (
                <div>
                    <h2>Album created</h2>
                    <p>
                        <Link to={`/project/albums/${createdAlbum.id}`}>
                            View album
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}

export default CreateAlbumPage;