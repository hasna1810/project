const db = require('../config/db'); // assuming you are using MySQL or another database

// Controller to handle adding a bus
const addBus = async (req, res) => {
  const { name, source, destination, departure_date, departure_time, seats } = req.body;

  // Validate input data
  if (!name || !source || !destination || !departure_date || !departure_time || !seats) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Check date and time format (assuming date format is YYYY-MM-DD and time format is HH:mm:ss)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/; // HH:mm:ss format

  if (!dateRegex.test(departure_date)) {
    return res.status(400).json({ success: false, message: 'Invalid departure date format' });
  }

  if (!timeRegex.test(departure_time)) {
    return res.status(400).json({ success: false, message: 'Invalid departure time format' });
  }

  // Validate that seats is a positive number
  if (isNaN(seats) || seats <= 0) {
    return res.status(400).json({ success: false, message: 'Seats must be a positive number' });
  }

  console.log('Inserting bus data:', { name, source, destination, departure_date, departure_time, seats });
  const query = `
    INSERT INTO buses (name, source, destination, departure_date, departure_time, seats)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    // Execute the query with the provided data
    db.query(query, [name, source, destination, departure_date, departure_time, seats], (err, result) => {
      if (err) {
        console.error('Error inserting bus into the database:', err);
        return res.status(500).json({ success: false, message: 'Failed to add bus', error: err.message });
      }

      console.log('Bus added successfully:', result);
      return res.status(201).json({
        success: true,
        message: 'Bus added successfully',
        busId: result.insertId,  // Returning the ID of the newly added bus
      });
    });
  } catch (error) {
    console.error('Error in addBus controller:', error);
    return res.status(500).json({ success: false, message: 'Error adding bus, please try again' });
  }
};

module.exports = { addBus };
