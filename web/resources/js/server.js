const PORT_WEB = 80;
const PORT_SOCK = 8080;

const express = require('express');
const io = require('socket.io')(PORT_SOCK);

const app = new express();

io.on('connection', function(socket) {
    socket.on('message', function(message){
        // console.log(message);
        io.emit('message', message);
        // io.broadcast.emit('message', message);
    });
});

app.use(express.static('public'));
app.use(express.static('node_modules/socket.io-client/dist'));

app.listen(PORT_WEB, function() {
    //console.log('Server Running at port ' + PORT_WEB);
});
