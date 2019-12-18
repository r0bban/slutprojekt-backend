const NeDB = require('nedb-promise')
const orders = new NeDB({filename:'database/orders.db', autoload: true})
const Product = require('./Product')
const User = require('./User')

function validate(body){
    let {items} = body
    if(items){ return true }
    return false
}

module.exports = {
    async create(body, user){
        if(validate(body)){
            const {items, customer, payment} = body
            const products = await Product.find(items)
            const order = await orders.insert({
                items,
                timeStamp: Date.now(),
                status: 'inProcess',
                orderValue: products.reduce((acc,product) => acc+product.price, 0)
            })
            return {error:false}
        }else{
            return {error:true}

        }

    },

    async all(){
        const ords = await orders.find({})
        return ords.sort( (a,b) => a.timeStamp - b.timeStamp)
    },

    async findByCustomer(userID){
        let user = await User.findOne(userID)
        const ords = await orders.find({_id:{$in:user.orders}})
        return ords
    }
}