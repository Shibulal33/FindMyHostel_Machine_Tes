const Router = require('express').Router()
const allRoute = require('./index')


Router.use('/user', allRoute.userRouter)
Router.use('/bill', allRoute.billRouter)


module.exports = Router