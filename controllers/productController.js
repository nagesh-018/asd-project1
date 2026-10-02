const productService = require('../services/productService');

async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        res.json(products);
    } catch (error) {
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

        res.json(product);
    } catch (error) {
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}

module.exports = {
    getProducts,
    getProductById
};