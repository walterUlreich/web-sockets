# Web Sockets

another web protocol, used to overcome limitations of traditional HTTP connection. 
- built on top of TCP
- to establish a websocket connection, we first send an HTTP request, with a special 'upgrade' header. 
- forms bidirectional communication between client and server. the server can proactively send down information without the client requesting it each time. 
- an alternative to AJAX.

## socket.io
- popular node library for implementing web sockets
- 2 halves of socket.io: server library lets you run a websocket server on top of your express server, and the client library lets you connect to a websocket server. 

