const NeDB = require('nedb-promise')
const products = new NeDB({filename:'database/products.db', autoload: true})

const categorySort = (a,b) => a.category < b.category ? -1 : 1


module.exports = {
    async find(params){
        if(params.length){
            return await products.find({_id: {$in:params}})
        }else{
            return await products.find(params)
        }
    },

    async all(){
        try{
            let prods = await products.find({})
            prods = prods.sort(categorySort)
            return prods

        }catch(error){
            console.log(error)
            return false
        }
    },

    async create(body){
        let {title, price, shortDesc, longDesc, imgFile} = body
        let serial = Date.now()
        try{
            await products.insert({title, price, shortDesc, longDesc, imgFile, serial})
            return {error: false}
        }catch(err){
            return {error: true, message:err}
        }
    },

}