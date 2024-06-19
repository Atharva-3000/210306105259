require('dotenv').config();
const express = require('express');
const productsRouter = require('./routes/product');

const app = express();
const port = process.env.PORT || 3000;

app.use('/categories', productsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});