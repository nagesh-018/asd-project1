const productService = require('../services/productService');
const cache = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        cache.setCache(req.originalUrl, products);

        res.json(products);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = Number(req.params.id);

        const product = await productService.getProductById(id);

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        cache.setCache(req.originalUrl, product);

        res.json(product);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    getProducts,
    getProductById
};