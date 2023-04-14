require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 3525;
// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const server = app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
});
const SocketIO = require('socket.io')
const io = SocketIO(server)
//webSockets
io.on('connection', (socket) => {
    socket.on('chat:message',(data) =>{

        io.socket.emit('chat:message',data)
        
    })
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data)
    })
})