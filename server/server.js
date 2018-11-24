require('./config/config')
require('./db/mongoose')

const path          = require('path'),
      http          = require('http'),
      express       = require('express'),
      { ObjectID }  = require('mongodb'),
      socketIO      = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', {
    from: 'Sohel',
    text: 'Hello',
    createdAt: 124
  })

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage)
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => console.log(`Server started on ${port}`))