const Router = require('express').Router()
const Controller =require('./../2_Controllers/products')

Router.get('/',Controller.getAllProducts) // bisa diakses semua user yang punya token (harus login)
Router.get('/:id') // bisa diakses semua user yang punya token (harus login)
Router.post('/',Controller.postNewProduct) //bisa diakses sama admin
Router.patch('/:id') //bisa diakses sama admin

module.exports = Router