import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'


//@desc create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = expressAsyncHandler(async (req, res) => {
    const {orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice } =  req.body

    if (orderItems && orderItems.length===0){
        res.status(400);
        throw new Error('No order items')
        return;
    }else {
        const order = new Order({
            orderItems,
            shippingAddress,
            user:req.user._id,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
    }

});



//@desc Get order by id
//@route GET /api/orders/:id
//@access Private
const getOrderByID = expressAsyncHandler(async (req, res) => {
   const order = await Order.findById(req.params.id).populate('user','name email');
   
   if (order){
       res.json(order)
   }else {
       res.status(404)
       throw new Error('Order not found')
   }
});


//@desc Update paid ordedr
//@route GET /api/orders/:id/pay
//@access Private
const updateOrdereToPaid = expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order){
        order.isPaid=true;
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email:req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder)
    }else {
        res.status(404)
        throw new Error('Order not found')
    }
});



//@desc Get  logged in user order
//@route GET /api/orders/myorders
//@access Private
const getUserOrderes = expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
});


export {addOrderItems, getOrderByID, updateOrdereToPaid, getUserOrderes}