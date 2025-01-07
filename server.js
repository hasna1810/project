const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Create a connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'data_entry' // Specify the existing database name
});

// Get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.json({ error: 'Error fetching users from the database' });
        }
        res.json(results);
    });
});

// Add a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    // Basic input validation
    if (!name || !email) {
        return res.json({ error: 'Name and email are required' });
    }

    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    db.query(query, [name, email], (err, results) => {
        if (err) {
            return res.json({ error: 'Error adding user to the database' });
        }
        res.json({ message: 'User added successfully', id: results.insertId, name, email });
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
