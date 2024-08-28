const express = require('express')
const Router = express.Router()
const billController = require('../controller/bill')

Router.put('/pay/:id', billController.updateBill)
Router.post('/bills', billController.createBill)


module.exports = Router