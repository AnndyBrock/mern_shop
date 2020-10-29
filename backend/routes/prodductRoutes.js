import express from'express';
import expressAsyncHandler from 'express-async-handler';
import productModel from '../models/productModel.js'

const router = express.Router();

//@desc fetch all product
//@route GET /api/products
//@access Public
router.get('/', expressAsyncHandler(async(req, res)=>{
    const products = await productModel.find({});
    res.json(products)
}));

//@desc fetch product by id
//@route GET /api/products/:id
//@access Public
router.get('/:id',expressAsyncHandler( async (req, res)=>{
    const product =await productModel.findById(req.params.id);

    if (product){
        res.json(product)
    }else {
        res.status(404);
        throw new Error('Product not  found');
    }

}));


export default router;