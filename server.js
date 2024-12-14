const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your React frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json()); // Parse JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Default MySQL user
  password: '',  // Default password for root in XAMPP
  database: 'bus_booking'  // Replace with your actual database name
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Bus Booking API!');
});

// API endpoint to get all buses
app.get('/api/buses', (req, res) => {
  db.query('SELECT * FROM buses', (err, results) => {
    if (err) {
      console.error('Error fetching buses:', err);
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// API endpoint to add a bus
app.post('/api/buses', (req, res) => {
  const { name, source, destination, departure_date, departure_time, seats } = req.body;

  // Validate input data
  if (!name || !source || !destination || !departure_date || !departure_time || !seats) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Insert bus details into the database
  const query = 'INSERT INTO buses (name, source, destination, departure_date, departure_time, seats) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, source, destination, departure_date, departure_time, seats], (err, result) => {
    if (err) {
  console.error('Error inserting bus into the database:', err.message);
  return res.status(500).json({ success: false, message: err.message });
}

    res.status(201).json({
      success: true,
      message: 'Bus added successfully',
      busId: result.insertId  // Returning the ID of the newly added bus
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});