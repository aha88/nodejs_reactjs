const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');

// Define user routes
router.post('/login', userController.postLogin);       
router.get('/users', authenticateToken, userController.getAllUsers);       
router.get('/user/:id', authenticateToken, userController.getUserId); 

module.exports = router;
