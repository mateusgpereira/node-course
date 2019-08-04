const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const port = process.env.PORT || 3000
const app = express()

const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket)=> {
    console.log('New websocket connection')
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (msg, callback)=>{
        const filter = new Filter()

        if(filter.isProfane(msg)) {
            return callback('Profanity is not allowed asshole!')
        }

        io.emit('message', msg)
        callback()
    })

    socket.on('sendLocation', (coords, callback)=>{
        socket.broadcast.emit('message', `https://www.google.com/maps?q=${coords.lat},${coords.long}`)
        callback()
    })

    socket.on('disconnect', ()=> {
        io.emit('message', 'A user has left')
    })
})

server.listen(port, () => {
    console.log(`server up and running on port: ${port}`)
})

