const database = require('../database/productDatabase');

async function getAllProducts() {
    return await database.getProducts();
}

async function getProductById(id) {
    const products = await database.getProducts();

    return products.find((product) => product.id === id);
}

module.exports = {
    getAllProducts,
    getProductById
};