require('dotenv').config()
const {Router} = require('express')
const User = require.main.require('./models/User')

const router = new Router()

router.post('/', async (req,res) => {
    let result = await User.authenticate(req.body.email, req.body.password)
    if(result.error){
        res.json({
            error: result.message
        })
    }else{
        res.json({
            token: result.token
        })
    }
})


module.exports = router