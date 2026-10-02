const database = require('../database/productDatabase');

async function getAllProducts() {
    return await database.getProducts();
}

async function getProductById(id) {
    const products = await database.getProducts();

    return products.find((product) => product.id === id);
}

async function createProduct(name, price) {
    const products = await database.getProducts();

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };

    products.push(newProduct);

    await database.saveProducts(products);

    return newProduct;
}

async function updateProduct(id, name, price) {
    const products = await database.getProducts();

    const product = products.find((product) => product.id === id);

    if (!product) {
        return null;
    }

    product.name = name;
    product.price = price;

    await database.saveProducts(products);

    return product;
}

async function patchProduct(id, name, price) {
    const products = await database.getProducts();

    const product = products.find((product) => product.id === id);

    if (!product) {
        return null;
    }

    if (name !== undefined) {
        product.name = name;
    }

    if (price !== undefined) {
        product.price = price;
    }

    await database.saveProducts(products);

    return product;
}

async function deleteProduct(id) {
    const products = await database.getProducts();

    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1);

    await database.saveProducts(products);

    return deletedProduct[0];
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};