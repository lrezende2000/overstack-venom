const express = require('express');
const router = express.Router();

const HealthController = require('./controllers/HealthController');
const VenomController = require('./controllers/VenomController');
const UserController = require('./controllers/UserController');

// API Checking
router.get('/health-check', HealthController.index);

// Venon Routes
router.post('/send-message', VenomController.sendMessage);

// User Routes
router.get('/users', UserController.index);
router.post('/user', UserController.store);
router.post('/user/desactive/:user_id', UserController.desactiveUser);
router.post('/user/active/:user_id', UserController.activeUser);

module.exports = router;
