const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

const cache = require('../middleware/cacheMiddleware');

router.get(
    '/products',
    cache.cacheMiddleware,
    productController.getProducts
);

router.get(
    '/products/:id',
    cache.cacheMiddleware,
    productController.getProductById
);

module.exports = router;