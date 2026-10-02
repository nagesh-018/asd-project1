const express = require('express');

const app = express();
const port = 3000;

const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to my Product API');
});

app.use(productRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;