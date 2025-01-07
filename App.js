import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    // Fetch users from the backend
    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((response) => setUsers(response.data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { name, email };

        // Send data to the backend
        axios.post('http://localhost:5000/users', newUser)
            .then((response) => {
                setUsers([...users, response.data]); // Update the list
                setName(''); // Clear the form
                setEmail('');
            })
            .catch((error) => console.error('Error adding user:', error));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>Data Entry System</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add User</button>
            </form>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
