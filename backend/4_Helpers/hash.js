const crypto = require('crypto') // built in package / library

require('dotenv').config()

function hashPass (pass){
    const hmac = crypto.createHmac('sha256',process.env.HASH_SECRET)
    const afterHash = hmac.update(pass).digest('hex')
    return afterHash
}


module.exports = hashPass