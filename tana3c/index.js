var io = require('socket.io-client');
var socket = io("http://localhost:3980");
var connected = false;
var interval;
    socket.on('connect', function(msg) {
            console.log("connected");
            connected = true;
            socket.emit('message', { value: 'load' });
            interval = setInterval(gay,100);
    });
socket.on('message',function(msg) {
    console.log(msg.value);
});

socket.on('reject',function(data) {
  console.log(data.value);
});


socket.on('disconnect', function(data) {
  connected = false;
  clearInterval(interval);
  console.log("disconnected");
});

function gay () {
 /**/for(i=0;i<100;i++)
    socket.emit('message', { value: 'pyonpyon' });
}


