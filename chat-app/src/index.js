const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')

const port = process.env.PORT || 3000
const app = express()

const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New websocket connection')

    socket.on('join', (options, callback) => {

        const {error, user } = addUser({ id: socket.id, ...options})

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))
    })

    socket.on('sendMessage', (msg, callback) => {
        const filter = new Filter()

        if (filter.isProfane(msg)) {
            return callback('Profanity is not allowed asshole!')
        }

        const user = getUser(socket.id)

        if(!user) {
            return callback('User not Found!')
        }

        io.to(user.room).emit('message', generateMessage(msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        if(!user) {
            return callback('User not Found!')
        }

        io.to(user.room).emit('locationMessage', generateLocationMessage(`https://www.google.com/maps?q=${coords.lat},${coords.long}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', generateMessage(`${user.username} has left`))    
        }
        
    })
})

server.listen(port, () => {
    console.log(`server up and running on port: ${port}`)
})