const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/routes')

const app = express()
const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`))

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api', routes)