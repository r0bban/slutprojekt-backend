const {Router} = require('express')
const Order = require('../models/Order')
const router = new Router()
const Auth = require('../middleware/auth')

router.get('/', Auth.user, async (req,res) => {
    let orders;
    if(req.user.role == 'admin'){
        orders = await Order.all()
    }else{
        orders = await Order.findByCustomer(req.user._id)
    }
    res.json(orders)
})

router.post('/', Auth.anonymous, async (req,res) => {
    let result = await Order.create(req.body, req.user)
    if(result.error){
        res.status(400).json({error: "Could not create order"})
    }else{
        res.json({message: "Order created"})
    }
})


module.exports = router