$(document).ready(function(){

    // var socket = io('/chat-server')

    // connect to the socket server using the default namespace '/'
    // calling 'io()' here fires the 'connection' event on the server.
    var socket = io()
    socket.on('message', function(data){
        console.log(data.message)
        $('#chat-messages').append(`<div class="icon"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div><li class="message">${data.team}: ${data.message}</li>`)

    })

    $('#all').on('click', function(){
        socket.emit('allchat', {message: $('input').val()})
        $('input').val('')
    })

    $('#team').on('click', function(){
        socket.emit('teamchat', {message: $('input').val()})
        $('input').val('')
    })


})
