const express = require('express');
const router = express.Router();
const { getProducts } = require('../controllers/productController');

router.get('/:categoryname/products', getProducts);
router.get('/:categoryname/products/:productName', getProducts);
module.exports = router;