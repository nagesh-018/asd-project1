const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const port = 3000;

const pathToFile = path.join(__dirname, 'db.json');

async function readFile() {
    try {
        let data = await fs.readFile(pathToFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let products = await readFile();

    return products;
}

app.get('/products', async (req, res) => {
    try {
        let products = await readFileWithDelay();

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);

        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;