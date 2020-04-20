const jwt = require('jsonwebtoken')
require('dotenv').config()

// const data ={
//     email : "avinda628@gmail.com",
//     id: '2'
// }

//const token = jwt.sign(data,'123rahasia')

//const decoded = jwt.verify(token,'123rahasia')

function createJwt (payload) {
    const token = jwt.sign(payload , process.env.JWT_SECRET)
    return token
}

function decodeToken (token) {
    const data = jwt.verify(token , process.env.JWT_SECRET)
    return data
}


module.exports = {
    createJwt,
    decodeToken
}
