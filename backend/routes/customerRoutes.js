const express = require('express');
const authController = require('../controllers/authControllers');
const customerController = require('../controllers/customerControllers');

const router = express.Router();

router.get('/transactions', authController.verifyToken, customerController.getUserTransactions);
router.post('/deposit', authController.verifyToken, customerController.performDeposit);
router.post('/withdrawal', authController.verifyToken, customerController.performWithdrawal);

module.exports = router;
