const express = require('express');
const authController = require('../controllers/authControllers');

const router = express.Router();

router.post('/customer-login', authController.customerLogin);
router.post('/banker-login', authController.bankerLogin);

module.exports = router;
