var express = require('express')
var app = express()
app.use(express.static('./'))

app.get('/', function(req, res){
    res.sendFile('./index.html', {root: './'})
})

var server = app.listen(8080)


var io = require('socket.io')

// we take our http server, pass it into socket.io, and that creates our socket server
var socketServer = io(server)


// the 'socketServer' variable represents the connectinon between my server and all of my websocket clients
// calling 'io()' on the client fires the 'connection' event here.
socketServer.on('connection', function(socket){
    // the 'socket' variable represents the connection between my server and one particular client

    console.log('someone connected!')
    // console.log('socket? ', socket)
    // 'emit' lets us create a custom event that the clients can listen to

    socketServer.emit('message', {
        // the clients don't know if other clients received this message too.
        message: "A new client connected!"
    })

    var coinFlip = Math.random() > .5
    if ( coinFlip === true ) {
        var team = 'red'
    } 
    else if ( coinFlip === false ) {
        var team = 'blue'
    }

    socket.emit('message', {
        message: `Welcome to the ${team} team.`,
    })

    // there is no function in socket.io to create rooms
    // if you join a room that does not exist, it will be created
    // when all users have left a room, it is automatically deleted
    socket.join(team)

    socket.on('allchat', function(data){
        console.log(data)
        socket.broadcast.emit('message', {
            team: team,
            message: data.message
        })
    })

    socket.on('teamchat', function(data){
        console.log(data)
        socket.broadcast.to(team).emit('message', {
            team: team,
            message: data.message
        })
    })

    socket.on('disconnect', function(data){
        console.log('a client disconnected')
    })

})

/* setting up other namespaces
var chatNameSpace = socketServer.of('/chat-server');
chatNameSpace.on('connection', function(socket){
  console.log('someone connected to the chat server!');
});
*/