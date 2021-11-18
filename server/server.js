const io = require('socket.io')(3000)
const users = {}

io.on('connection',socket => {
    socket.on('new-user',name => {
        users[name] = socket.id
        socket.broadcast.emit('user-connected',name,socket.id)
    })
    
    socket.on('typing',(name,sender) => { 
        socket.to(users[name]).emit('user-typing',sender)
    })

    socket.on('send-chat-message',(message,sender,name) => {
            socket.to(users[name]).emit('chat-message',{message: message, sender:sender})
    })

    socket.on('disconnect',() => {
       socket.broadcast.emit('user-disconnected',socket.id)
       Object.entries(users).map(user => {
          const [key,value] = user
          if(value === socket.id) 
                delete users[key]
       })
          
    })

        
  
})

