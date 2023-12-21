const express = require('express');
const {verifyToken } = require('../controllers/authControllers');
const bankerController = require('../controllers/bankerControllers');

const router = express.Router();

router.get('/transactions/:id', verifyToken, bankerController.getSpecTransaction);
router.get('/accounts', verifyToken, bankerController.getAllTransactions);

module.exports = router;
