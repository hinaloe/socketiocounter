var io = require('socket.io-client');
var socket = io(/*"http://sudosan.net:3940/"*/"http://localhost:3980");
var connected = false;
var interval;
    socket.on('connect', function(msg) {
            console.log("connected");
            connected = true;
            socket.emit('message', { value: 'load' });
//interval = setInterval(gay,100);
    });
socket.on('message',function(msg) {
console.log(msg.value);
});


socket.on('disconnect', function(data) {
  connected = false;
//  clearInterval(interval);
  console.log("disconnected");
});

function gay () {
 for(i=0;i<500;i++)
 socket.emit('message',{value:'pyonpyon'});
}


