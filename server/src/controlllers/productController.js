const productDB = require('../models/productmodel')

// create products
exports.creatProducts = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body
        if (!name || !description || !price || !category || !image) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const product = new productDB({ name, description, price, category, image });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// get products
exports.getProducts = async (req, res) => {
    try {
        const products = await productDB.find()
        res.status(201).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// get product by id
exports.getProductById = async (req, res) => {
    try {
        const product = await productDB.findOne({ _id: req.params.id });
        if (!product) {
            res.status(404).json({ message: "product not found" })
        }
        return res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// update product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body

        const product = await productDB.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" })
        product.name = name
        product.description = description
        product.price = price
        product.category = category
        product.image = image

        const newproduct = await product.save();
        res.status(201).json(newproduct);

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// delete products
exports.deleteProduct = async (req, res) => {
    try {
        const product = await productDB.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" })

        await product.deleteOne()
        res.json({ message: "Product deleted" })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}
