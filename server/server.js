const io = require('socket.io')(3000)

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

