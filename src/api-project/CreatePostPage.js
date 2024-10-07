import React, { useEffect, useState } from 'react';
import { API_URL } from './Config';
import { Link, useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [selectedUser, setSelectedUser] = useState('empty');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [users, setUsers] = useState([]);
    const [createdPost, setPostCreated] = useState(null);
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
    const bodyHandler = event => setBody(event.target.value);

    const submitHandler = event => {
        event.preventDefault();

        if (selectedUser === 'empty') {
            alert('Please select a user');
            return;
        }

        const newPost = {
            title,
            body,
            userId: parseInt(selectedUser, 10)
        };

        fetch(`${API_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify(newPost),
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
                setPostCreated(data);
                navigate(`/project/posts/${data.id}`);
            })
            .catch(error => console.error('Error creating post:', error));
    };

    return (
        <div>
            <h1>Create a New Post</h1>
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
                <button type="submit">Create Post</button>
            </form>
            {createdPost && (
                <div>
                    <h2>Post Created Successfully!</h2>
                    <p>Title: {createdPost.title}</p>
                    <p>Body: {createdPost.body}</p>
                    <Link to={`/project/posts/${createdPost.id}`}>View Post</Link>
                </div>
            )}
        </div>
    );
};

export default CreatePostPage;