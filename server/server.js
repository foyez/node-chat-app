require('./config/config')
require('./db/mongoose')

const path = require('path')
const publicPath = path.join(__dirname, '../public')
const express = require('express')
const { ObjectID } = require('mongodb')

const app = express()
const port = process.env.PORT

app.use(express.static(publicPath))

// app.get('/', (req, res) => {
//   res.send('Hello')
// })

app.listen(port, () => console.log(`Server started on ${port}`))