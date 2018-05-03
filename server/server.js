//import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

var WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: 3000,
    });
var turn = true;
var taulell = [
    ['Br', 0, 0, 0],
    ['Br', 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

var select = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let pintat = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

let lastX = 0, lastY = 0;
const taulellyMAX = 4;
const taulellxMAX = 4;

console.log((new Date()) + "WebSocket Server is listening on port 3000");
console.log("asjd");

server.on('connection', function connection(ws) {
    console.log('Conected');
    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        //console.log("Rebut: " + data);
        server.clients.forEach(function each(client) {
            let pos = JSON.parse(data);
            let idy = pos[0];
            let idx = pos[1];

            if (taulell[idy][idx] != 0) {
                vaciar();
                select[idy][idx] = 1;
                //console.log(select);
                lastX = idx;
                lastY = idy;
            } else if (taulell[idy][idx] == 0 && select[lastY][lastX] == 1) {
                //console.log("Anterior: "+taulell);
                //console.log('Selected: '+select);
                if (taulell[lastY][lastX] == 'Br') moureRect(idx, idy);
                console.log("Nou: " + taulell);
                vaciar();
                //console.log('Selected: '+select);
                //rellenar();
            }
            var myJsonString = JSON.stringify(taulell);
            console.log("JSON= " + myJsonString);
            client.send(myJsonString);

            function vaciar() {
                for (let i = 0; i < taulellyMAX; i++) {
                    for (let x = 0; x < taulellxMAX; x++) {
                        select[i][x] = 0;
                    }
                }
            }

            function moureRect(idx, idy) {
                if (idx == lastX || idy == lastY) {
                    taulell[idy][idx] = 'Br';
                    paintH(lastX, idx, idy);
                    //paintV(lastY, idy);
                    taulell[lastY][lastX] = 0;
                }
            }

            function paintH(last, cur, fix)
            {
                if(last!=cur)
                {
                    if(last<cur)
                    {
                        for(last; last<=cur; last++)
                        {
                            pintat[fix][last]=1;
                        }
                    }
                } 
                console.log("TAULELL PINTAT: "+ pintat);
            }
        });
    });
});