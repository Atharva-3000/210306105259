const { fetchProductsFromEcommerceAPIs } = require('../services/ecommerceService');

const getProducts = async (req, res) => {
    try {
        const { categoryname } = req.params;
        const { top, minPrice, maxPrice } = req.query;

        const products = await fetchProductsFromEcommerceAPIs(categoryname, top, minPrice, maxPrice);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getProductById = async (req, res) => {
    try {
        const { categoryname, productname } = req.params;

        const product = await productService.getProductByName(categoryname, productname);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    getProducts,
    getProductById
};