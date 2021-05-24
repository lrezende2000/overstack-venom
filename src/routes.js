const express = require('express');
const router = express.Router();

const HealthController = require('./controllers/HealthController');
const QueueController = require('./controllers/QueueController');
const UserController = require('./controllers/UserController');
const MessageController = require('./controllers/MessageController');

// API Checking
router.get('/health-check', HealthController.index);

// Venon Routes
router.post('/send-message', QueueController.queueMessages);

// User Routes
router.get('/users', UserController.index);
router.post('/user', UserController.store);
router.post('/user/desactive/:user_id', UserController.desactiveUser);
router.post('/user/active/:user_id', UserController.activeUser);

// Message Routes
router.post('/message', MessageController.newMessage);

module.exports = router;
