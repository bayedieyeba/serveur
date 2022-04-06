const express  = require("express")
var htt = require("http")
const cors = require("cors")
const app = express()

const port = process.env.PORT || 5000
var server  = htt.createServer(app)

var io = require("socket.io")(server,{
    cors:
    {
        origin:"*"
    }
})

app.use(express.json())
app.use(cors())
var clients = {}

io.on("connection",(socket)=>{
    console.log("connecté")
    socket.on("signin",(id)=>{
        console.log((id))
    })
    socket.on("message",(msg)=>{
        console.log((msg))
        let targetId = msg.targetId
        if(clients[targetId]) clients[targetId].emit("message",msg)
    })
})

server.listen(port,"0.0.0.0",()=>{
    console.log("le seveur a démaré")
})
