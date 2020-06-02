const NeDB = require('nedb-promise')
const uuid = require('uuid')
const users = new NeDB({filename:'database/users.db', autoload: true})
const products = new NeDB({filename:'database/products.db', autoload: true})
const bcrypt = require('bcryptjs')
const productsSeed = require('./productsSeed.json')
const usersSeed = require('./usersSeed.json')

usersSeed.forEach(user => user.password = bcrypt.hashSync('password', 10));

(async ()=>{
    await users.remove({},{multi:true})
    await products.remove({},{multi:true})
    await users.insert(usersSeed)
    await products.insert(productsSeed)
})()