var io = require('socket.io')();
var fs = require('fs');
var reject = {};

var fileName = "count.dat";

var count = +fs.readFileSync(fileName, "utf8");
if(isNaN(count))process.exit(1);


io.on('connection',function(socket){
 socket.on('message',function(m){
  console.log(m);
  console.log(socket.handshake.address);
  if (m.value && m.value==='pyonpyon') {
  if (reject[socket.handshake.address]) {
    console.log("reject"+socket.handshake.address);
    return socket.emit('reject', {value: 'rejected!'});
  }
  reject[socket.handshake.address] = true;
  setTimeout(function(r){delete r[socket.handshake.address]},3000,reject);
  count++;
  io.emit('message',{value:count});
  console.log(count);
  if (count % 1000 === 0 ) {
    fs.writeFile(fileName,count ,function(err){
     if(err)throw err;
     console.log("write Success");
    });
   }
  }
  
 });
 console.log('connected');
});
io.listen(3980);
