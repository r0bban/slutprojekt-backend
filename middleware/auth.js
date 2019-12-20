const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {

    async anonymous(req,res,next){
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, 'secret')
            const user = await User.findOneBy({ _id: data.id })
            if (!user) { throw new Error() }

            req.user = user
            
            next()
        } catch (error) {
            req.user = {role:'anonymous'}
            next()
        }
    },

    async admin(req, res, next){
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, 'secret')
            const user = await User.findOneBy({ _id: data.id })
            if (!user) { throw new Error() }
            else if(user.role != "admin"){ throw new Error() }

            req.user = user
            
            next()
        } catch (error) {
            res.status(401)
            .send({ error: 'Unauthorized' })
        }
    
    },

    async user(req, res, next){
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, 'secret')
            const user = await User.findOne(data.id)
            if (!user) { throw new Error() }
            req.user = user
            next()
        } catch (error) {
            res.status(401)
            .send({ error: 'Unauthorized' })
        }
    
    }
}