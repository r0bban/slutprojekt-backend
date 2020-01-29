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
            message: "Product created!",
            product: result.product
        })
    }
})

router.patch('/:id', Auth.admin, async (req,res) => {
    let result = await Product.update(req.params.id, req.body)
    if(result.error){
        res.status(400).json({error: 'Could not update product'})
    }else{
        res.status(200).json({message: 'Product updated', data: result.data})
    }
})


router.delete('/:id', Auth.admin, async (req,res) => {
    let result = await Product.destroy(req.params.id)
    if(result.error){
        res.status(400).json({error: 'Could not delete product'})
    }else{
        res.status(200).json({message: 'Product obliteraded'})
    }
})


module.exports = router