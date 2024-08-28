const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI
mongoose.connect(uri)

mongoose.connection.on('connected', () => {
    console.log('Database connected')
})

mongoose.connection.on('error', (error) => {
    console.error('Databaser Error: ' + error)
})

mongoose.connection.on('disconnected', () => {
    console.log('Databse disconnected')
})

module.exports = mongoose