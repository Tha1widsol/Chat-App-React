const express = require("express")
const http = require("http")
const app = express();
const server = http.createServer(app)
const socket = require("socket.io");
const io = socket(server)

io.on("connection",socket => {
    socket.emit("your id",socket.id);
    socket.on("send message",body => {
        io.emit("message",body)
    })
})

server.listen(3000, () => console.log("Server is running on port 3000"));
