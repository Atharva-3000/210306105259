require('dotenv').config();
const cors = require('cors');
const express = require('express');
const productsRouter = require('./routes/product');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/categories', productsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});