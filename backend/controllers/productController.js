import expressAsyncHandler from 'express-async-handler';
import productModel from '../models/productModel.js'


//@desc fetch all product
//@route GET /api/products
//@access Public
const getProducts = expressAsyncHandler(async (req, res) => {
    const products = await productModel.find({});
    res.json(products)
});


//@desc fetch product by id
//@route GET /api/products/:id
//@access Public
const getProductById = expressAsyncHandler(async (req, res) => {
    const product =await productModel.findById(req.params.id);

    if (product){
        res.json(product)
    }else {
        res.status(404);
        throw new Error('Product not  found');
    }
});

export {getProducts, getProductById}