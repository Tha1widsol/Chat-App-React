const io = require('socket.io')(3000)
const users = {}

io.on('connection',socket => {
    socket.on('new-user',name => {
        users[name] = socket.id
        socket.broadcast.emit('user-connected',name,socket.id)
    })
    
    socket.on('typing',(name,logged_in_username) => { 
        socket.to(users[name]).emit('user-typing',logged_in_username)
    })

    socket.on('send-chat-message',(message,logged_in_username,name) => {
            socket.to(users[name]).emit('chat-message',{message: message, name:logged_in_username})
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

