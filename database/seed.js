const NeDB = require('nedb-promise')
const uuid = require('uuid')
const users = new NeDB({filename:'database/users.db', autoload: true})
const products = new NeDB({filename:'database/products.db', autoload: true})
const bcrypt = require('bcrypt')
const productsSeed = require('./productsSeed.json')
const usersSeed = require('./usersSeed.json')
usersSeed.forEach(user => user.password = bcrypt.hashSync('omg', 10));

(async ()=>{
    await users.remove({},{multi:true})
    await products.remove({},{multi:true})
    await users.insert(usersSeed)
    await products.insert(productsSeed)
})()

// users.insert({
//     email: 'admin@example.com',
//     password: bcrypt.hashSync("omg", 10),
//     name: "Johan Kivi",
//     role: 'admin',
//     adress: {
//         street: 'Tokitokvägen 3',
//         zip: '123 45',
//         city: 'Tokberga'
//     },
//     payment: {
//         cardOwner: 'Johan Kivi',
//         cardNumber: '1234 5678 9101 1121',
//         validUntil: '10 / 23',
//         cvv: '123'
//     },
//     ordersHistory: []
// })

// users.insert({
//     email: 'customer@example.com',
//     password: bcrypt.hashSync("omg", 10),
//     name: "David Lundholm",
//     role: 'customer',
//     adress: {
//         street: 'Tokitokvägen 4',
//         zip: '123 46',
//         city: 'Tokbergaskogen'
//     },
//     payment: {
//         cardOwner: 'Johan Kivi',
//         cardNumber: '1234 5678 9101 1121',
//         validUntil: '10 / 23',
//         cvv: '123'
//     },
//     ordersHistory: [{
        
//     }]
// })


