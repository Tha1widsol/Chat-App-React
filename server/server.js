const io = require('socket.io')(3000)
const users = {}

io.on('connection',socket => {
    socket.on('new-user',name => {
        users[name] = socket.id
        socket.broadcast.emit('user-connected',name,socket.id)
    })
    
    socket.on('user-typing',(name,logged_in_username) => { 
        socket.to(users[name]).emit('typing',logged_in_username)
    })

    socket.on('send-chat-message',(message,logged_in_username,name) => {
            socket.to(users[name]).emit('chat-message',{message: message, name:logged_in_username})
    })

    socket.on('disconnect',name => {
       socket.broadcast.emit('user-disconnected',name)
       delete users[name]
    })

        
  
})

