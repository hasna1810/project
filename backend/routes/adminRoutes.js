const express = require('express');
const router = express.Router();

// Import the controller
const { addBus } = require('../controllers/adminController');

// POST route for adding a bus
router.post('/add-bus', addBus);

module.exports = router;
