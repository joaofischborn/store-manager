const express = require('express');

const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController.listAllProducts);
router.get('/:id', productsController.findById);
router.post('/', productsController.insertNewProduct);

module.exports = router;
