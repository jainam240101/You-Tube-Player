const http=require('http')
const express=require('express')
const path=require('path')
const sockets=require('socket.io')

const app=express()
const server=http.createServer(app)
const io=sockets(server)
const port= 3000||process.env.PORT
const filepath=path.join(__dirname,"../public/HTML")
app.use(express.static(filepath))


io.on('connection',(socket)=>{
    console.log("New Connection!")
    socket.on('state',(value)=>{
        console.log(value)
        socket.broadcast.emit('change_state',value)
    })
})

server.listen(port,()=>{
    console.log("Server Up on Port ",port)
})
