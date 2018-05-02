import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

var WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: 3000,
    });
var turn=true;
var taulell = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,'bk']
];
console.log((new Date()) + "WebSocket Server is listening on port 3000");

server.on('connection', function connection(ws) {
    console.log('Conected');
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
      console.log("Rebut: "+data);
    server.clients.forEach(function each(client) {
        /*if(data.startsWith('B'))
        {
            
        }*/        
        var myJsonString = JSON.stringify(pos);
        console.log("JSON= "+myJsonString);
        client.send(myJsonString);
    });
  });
});