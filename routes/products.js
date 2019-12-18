const {Router} = require('express')
const Auth = require('../middleware/auth')
const Product = require('../models/Product')
const router = new Router()

router.get('/', async (req,res) => {
    let products = await Product.all()
    res.json(products)
})

router.get('/:id', (req,res) => {
    res.send('PRODUCTS!')
})

router.post('/', Auth.admin, async (req,res) => {
    let result = await Product.create(req.body)
    if(result.error){
        res.json({
            error: "Could not create product"
        })
    }else{
        res.json({
            message: "Product created!"
        })
    }
})
router.get('/:id', (req,res) => {
    res.send('PRODUCTS!')
})

module.exports = router