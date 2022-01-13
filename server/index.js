const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")

const {Server} = require("socket.io")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
})

io.on('connection',socket => {
    socket.on('new-user',room => {
        socket.join(room)
    })
    
    socket.on('typing',(room,sender) => { 
        socket.to(room).emit('user-typing',sender)
    })

    socket.on('send-chat-message',(message,sender,room) => {
            socket.to(room).emit('chat-message',{message: message, sender:sender})
    })
    
    socket.on('disconnect',() => {
       socket.broadcast.emit('user-disconnected',socket.id)
      
    })

})

server.listen(4000,() => {
    console.log("server is running")
})