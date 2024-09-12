const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController'); // Correct import path
const authenticateToken = require('../middleware/authMiddleware');

// Define Customer routes
router.get('/customers', authenticateToken, customersController.getAllCustomer); 
router.get('/customer/:id', authenticateToken, customersController.idCustomer);   
router.post('/customer/add', authenticateToken, customersController.addCustomer);   
router.post('/customers_delete/:id', authenticateToken, customersController.deleteCustomer);  
router.post('/customers_update/:id', authenticateToken, customersController.updateCustomer);  

module.exports = router;
