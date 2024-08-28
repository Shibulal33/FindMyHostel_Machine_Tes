const Router = require('express').Router()
const userController = require('../controller/user')

Router.get('/login', userController.login)
Router.post('/users', userController.signup) // signup
Router.get('/users', userController.listAllUsers)
Router.get('/bills', userController.getBills)
Router.put('/vacate/:id', userController.vacateUser)


module.exports = Router