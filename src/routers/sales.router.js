const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

// router.post('/', salesController.insertNewSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;