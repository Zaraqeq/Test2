//import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile(__dirname+'/test.html');
});
var turn = true;
var taulell = [
    ['Br', 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 'Br']
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
var turn = true;

var roomno = 1;
io.on('connection', function (socket) {
    if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) roomno++;
   socket.join("room-"+roomno);
   
    let table = ["Taulell", taulell];
    ws.send(JSON.stringify(table));
    let enviar = ["Pintar", pintat];
    io.sockets.in("room-"+roomno).emit(JSON.stringify(enviar));
});

io.on('message', function incoming(data) {
    // Broadcast to everyone else.
    //console.log("Rebut: " + data);


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

        if (taulell[lastY][lastX].endsWith("r")) moureRect(idx, idy);
        console.log("Nou: " + taulell);
        vaciar();
        //console.log('Selected: '+select);
        //rellenar();
    }
    let table = ["Taulell", taulell];
    //console.log("JSON= " + myJsonString);
    io.sockets.in("room-" + roomno).emit(JSON.stringify(table));

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
            //paintV(lastY, idy, idx);
            console.log("Taula pintada: " + pintat);
            taulell[lastY][lastX] = 0;
            turn = !turn;
        }
    }

    function paintH(last, cur, fix) {
        let color;
        if (turn) color = 1;
        else color = 2;
        if (last < cur && last != cur) {
            console.log(last, cur);
            for (last; last <= cur; last++) {
                pintat[fix][last] = color;
                console.log("B1 Last X: " + last + " Curr X: " + cur);
            }
            console.log(last, cur);
            last = cur;
        }

        if (last > cur && last != cur) {

            for (last; last >= cur; last--) {
                pintat[fix][last] = color;
                console.log("B2 Last X: " + last + " Curr X: " + cur);
            }
            last = cur;
        }

        let enviar = ["Pintar", pintat];
        io.sockets.in("room-"+roomno).emit(JSON.stringify(enviar));
    }

    function paintV(last, cur, fix) {
        if (last != cur) {
            if (last < cur) {
                for (last; last <= cur; last++) {
                    pintat[last][fix] = 1;
                    console.log("B1 Last Y: " + last + " CurrY: " + cur);
                }
            }

            if (last > cur) {
                for (last; last >= cur; last--) {
                    pintat[last][fix] = 1;
                    console.log("B2 LastY: " + last + " CurrY: " + cur);
                }
            }
        }

        let enviar = ["Pintar", pintat];
        io.sockets.in("room-" + roomno).emit(JSON.stringify(enviar));
    }
});


http.listen(8082, function () {
    console.log('listening on localhost:8082');
});
