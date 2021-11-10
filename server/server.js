const io = require('socket.io')(3000)
const users = {}
const rooms = {}

io.on('connection',socket => {
    socket.on('new-user',name => {
        users[name] = socket.id

        socket.broadcast.emit('user-connected',name,socket.id)
    })

    socket.on('join',room => {
        socket.join(room)
    })

    socket.on('send-chat-message',(message,logged_in_username,name) => {
            socket.to(users[name]).emit('chat-message',{message: message, name:logged_in_username,id:socket.id})
    })

    socket.on('disconnect',() => {
       socket.broadcast.emit('user-disconnected',users[socket.id])
       delete users[socket.id] 
    })

    socket.on('user-typing',name => { 
        socket.to(users[name]).emit('typing',name)
    })
        
  
})

