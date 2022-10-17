const express = require('express');

const productsController = require('../controllers/products.controller');
const validateProductNameField = require('../middlewares/ValidateProductNameField');

const router = express.Router();

router.get('/', productsController.listAllProducts);
router.get('/:id', productsController.findById);
router.post('/', validateProductNameField, productsController.insertNewProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
