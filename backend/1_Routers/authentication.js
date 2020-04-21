const Router = require('express').Router()
const Controller = require('./../2_Controllers/authentication')

Router.get('/',(req,res)=>res.send('<h1>Router Auth</h1>'))
Router.patch('/verify/:token', Controller.verify)
Router.post('/register', Controller.Register)
Router.post('/login', Controller.login)
Router.post('/testauth',Controller.testNodemailer)
Router.post('/forget',Controller.forget)
Router.patch('/reset/:token',Controller.reset)
Router.post('/verifycode/:token',Controller.verifycode)

module.exports= Router