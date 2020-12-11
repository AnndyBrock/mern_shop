import express from'express';
import {addOrderItems, getOrderByID, updateOrdereToPaid} from '../controllers/orderController.js'
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect,getOrderByID)
router.route('/:id/pay').put(protect,updateOrdereToPaid)


export default router;