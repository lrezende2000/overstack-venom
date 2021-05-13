const express = require('express');
const router = express.Router();

const HealthController = require('./controllers/HealthController');
const VenomController = require('./controllers/VenomController');

// API Checking
router.get('/health-check', HealthController.index);

// Venon Routes
router.post('/send-message', VenomController.sendMessage);

module.exports = router;