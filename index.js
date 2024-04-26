const express = require('express')
const app = express() 
const PORT = 8000 
const http = require('http') 
const server = http.createServer(app)
const{Server} = require('socket.io')
const io = new Server(server)

server.listen(PORT, () => { 
    console.log(`server is running on http://localhost:${PORT}`);
})

io.on("connection", (socket) => {
    console.log(`connected user id: ${socket.id}`);  

    setInterval(() => {
        const d = new Date() 
        const t = d.getTime()
        socket.send(t)
    },100)
    
    socket.on("disconnect", () => { 
        console.log(`disconnected user id: ${socket.id}`); 
    })
}
);

app.get('/', (req, res) => { 
    res.sendFile(__dirname + "/index.html")
})
