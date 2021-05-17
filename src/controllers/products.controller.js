import Product from '../models/Product'

// create a new product
export const createProduct = async (req, res) => {
    const {name, category, price, imgURL} = req.body; // destructuring del req
    const newProduct = new Product({name, category, price, imgURL}); // creating new product
    const productSaved = await newProduct.save(); // save the product in the DB
    res.status(201).json(productSaved) // return the response
}

// get all products
export const getProducts = async (req, res) => {
    const products = await Product.find(); // find all products
    res.status(200).json(products);
}

// get product by Id
export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.productId); // find prosuct by Id
    res.status(200).json(product);
}

// update a product by Id
export const updateProductById = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    });
    res.status(200).json(updateProduct);
}

// delete a product by Id
export const deleteProductsById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(204).json();
}