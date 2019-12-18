const {Router} = require('express')
const User = require('../models/User')
const router = new Router()

router.post('/', async (req,res) => {
    let user = await User.create(req.body)
    if(user.error){
        res.status(400)
        .json({
            errors: user.messages
        })
    }else{
        res.status(200)
        .json({
            message: "User registered!"
        })
    }
})


module.exports = router