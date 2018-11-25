require('./config/config')
require('./db/mongoose')

const path               = require('path'),
      http               = require('http'),
      express            = require('express'),
      { ObjectID }       = require('mongodb'),
      socketIO           = require('socket.io'),
      { generateMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', generateMessage ('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage ('Admin', 'New user joined'))

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)

    io.emit('newMessage', generateMessage (message.from, message.text))
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected')
  })
})

server.listen(port, () => console.log(`Server started on ${port}`))