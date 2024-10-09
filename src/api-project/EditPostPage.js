import React, { useEffect, useState } from 'react';
import { API_URL } from './Config';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditPostPage = () => {
    const [selectedUser, setSelectedUser] = useState('empty');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [users, setUsers] = useState([]);
    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/users`)
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    useEffect(() => {
        if (postId) {
            fetch(`${API_URL}/posts/${postId}`)
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title);
                    setBody(data.body);
                    setSelectedUser(data.userId.toString());
                })
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [postId]);

    const userHandler = event => setSelectedUser(event.target.value);
    const titleHandler = event => setTitle(event.target.value);
    const bodyHandler = event => setBody(event.target.value);

    const submitHandler = event => {
        event.preventDefault();

        if (selectedUser === 'empty') {
            alert('Please select a user');
            return;
        }

        const updatedPost = {
            title,
            body,
            userId: parseInt(selectedUser, 10)
        };

        const requestOptions = {
            method: 'PUT',
            body: JSON.stringify(updatedPost),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        fetch(`${API_URL}/posts/${postId}`, requestOptions)
            .then(res => {
                if (!res.ok) {
                    console.error(`Network response was not ok: ${res.status} ${res.statusText}`);
                    throw new Error(`Network response was not ok: ${res.status} ${res.statusText}`);
                }
                return res.json();
            })
            .then(data => {
                navigate(`/project/posts/${data.id}`);
            })
            .catch(error => console.error('Error updating post:', error));
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={submitHandler}>
                <div>
                    <label htmlFor="user">User:</label>
                    <select id="user" value={selectedUser} onChange={userHandler}>
                        <option value="empty">Select a user</option>
                        {users && users.map(user => (
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={bodyHandler}
                        required
                    />
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPostPage;