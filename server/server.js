//import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
const rook = require('./classes/rook.js');
const bishop = require('./classes/bishop.js');
const queen = require('./classes/queen.js');
var WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: 3000,
    });
var turn = true;
var taulell = [];
var select = [];
let pintat = [];
let diag = [];

let lastX = 0, lastY = 0;
const taulellyMAX = 24;
const taulellxMAX = 24;
let enemic = 0;
var turn = true;
var click = false;
let color;
console.log((new Date()) + "WebSocket Server is listening on port 3000");

server.on('connection', function connection(ws) {
    console.log('Conected');
    let table = ["Taulell", taulell];
    ws.send(JSON.stringify(table));
    let enviar = ["Pintar", pintat];
    ws.send(JSON.stringify(enviar));
    let turnMes = ["Turn", turn];
    ws.send(JSON.stringify(enviar));
    initDiag();
    initTaulell();
    initPint();
    initSelect();

    ws.on('message', function incoming(data) {
        // Broadcast to everyone else.
        //console.log("Rebut: " + data);
        let pos = JSON.parse(data);
        let idy = pos[0];
        let idx = pos[1];


        server.clients.forEach(function each(client) {
            console.log(click);
            //click=false;
            if (taulell[idy][idx] != 0 && select[lastY][lastX]==0) {
                vaciar();
                //console.log("He entrat");
                select[idy][idx] = 1;
                //let pesa = taulell[lastY][lastX];

                //taulell[idy][idx].movRect();
                //console.log(taulell[idy][idx].movRect());
                if (turn) {
                    enemic = "B";
                } else if (!turn) {
                    enemic = "W";
                }

                //console.log("Enemic: "+enemic+" Pesa: "+pesa);
                lastX = idx;
                lastY = idy;

                click = true
            } else if ((taulell[idy][idx] == 0 || taulell[idy][idx].col()==enemic) && select[lastY][lastX] == 1) { //color 1 = yellow
                //console.log(taulell[idy][idx]);
                //console.log("Anterior: "+taulell);
                //console.log("Enemic: " + enemic);
                //console.log("He entrat 2");
                if (turn) color = 1;
                else color = 2;

                if (taulell[lastY][lastX].col() == "W") {
                    if (taulell[lastY][lastX].pieceType() == "r" && taulell[lastY][lastX].movRect(idx, idy)) {

                        taulell[idy][idx] = taulell[lastY][lastX];
                        taulell[lastY][lastX] = 0;
                        paintH(lastX, idx, idy);
                        paintV(lastY, idy, idx);
                        //moureRect(idx, idy, "Wr");
                    } else if (taulell[lastY][lastX].pieceType() == "b" && taulell[lastY][lastX].movDiag(idx, idy, diag)) {
                        taulell[idy][idx] = taulell[lastY][lastX];
                        taulell[lastY][lastX] = 0;
                        //moureDiag(idx, idy, "Wb");
                        paintDiag(idx, idy, color);
                    } else if (taulell[lastY][lastX].pieceType() == "q" && (taulell[lastY][lastX].movDiag(idx, idy, diag) || taulell[lastY][lastX].movRect(idx, idy))) {
                        taulell[idy][idx] = taulell[lastY][lastX];
                        taulell[lastY][lastX] = 0;
                        //paintH(lastX, idx, idy);
                        //paintV(lastY, idy, idx);
                        paintDiag(idx, idy, color);

                    } else {
                        let error = ["Error", "Moviment Invalid"];
                        client.send(JSON.stringify(error));
                    }
                } else if (taulell[lastY][lastX].col() == "B") {
                    if (taulell[lastY][lastX].pieceType() == "r" && taulell[lastY][lastX].movRect(idx, idy)) {
                        taulell[idy][idx] = taulell[lastY][lastX];
                        taulell[lastY][lastX] = 0;


                        //moureRect(idx, idy, "Br");
                    } /*else if (taulell[lastY][lastX].endsWith("b")) {
                        moureDiag(idx, idy, "Bb");
                    } else if (taulell[lastY][lastX].endsWith("q")) {
                        moureDiag(idx, idy, "Bq");
                        moureRect(idx, idy, "Bq");
                    }*/
                }

                //console.log("Nou: " + taulell);
                vaciar();
                //console.log('Selected: '+select);
                select[lastY][lastX]=0;
            
            }

            //click=false;
            console.log(taulell);
            let table = ["Taulell", taulell];
            //console.log("JSON= " + myJsonString);
            client.send(JSON.stringify(table));

            function vaciar() {
                for (let i = 0; i < taulellyMAX; i++) {
                    for (let x = 0; x < taulellxMAX; x++) {
                        select[i][x] = 0;
                    }
                }
            }

            /*function moureDiag(idx, idy, piece) {
                let i = 0;
                var trobat = false;
                let color;
                //console.log("Lenght: "+diag[lastY][lastX].length+" I: "+i);
                while (trobat == false && i < diag[lastY][lastX].length) {
                    var str = diag[lastY][lastX][i];
                    let num = str.split(".");

                    //console.log(diag[lastY][lastX][i].charAt(0) + diag[lastY][lastX][i].charAt(2));
                    if (num[0] == idy && num[1] == idx) trobat = true;
                    //console.log("Num0: "+num[0]+" Num1: "+num[1]);
                    i++;
                }

                if (trobat == true) {
                    if (lastX != idx && lastY != idy) {
                        //console.log(taulell);
                        //console.log("IDY: "+idy+" IDX: "+idx+" Piece: "+piece+" LastY: "+lastY+" LastX: "+lastX);
                        taulell[idy][idx] = piece;
                        //console.log(taulell);
                        if (piece.startsWith("W")) color = 1;
                        else color = 2;
                        paintDiag(idx, idy, color);
                        taulell[lastY][lastX] = 0;
                        turn = !turn;
                    }

                }
                let enviar = ["Turn", turn];
                client.send(JSON.stringify(enviar));
            }

            function moureRect(idx, idy, piece) {
                if (idx == lastX || idy == lastY) {
                    taulell[idy][idx] = piece;
                    paintH(lastX, idx, idy);
                    paintV(lastY, idy, idx);
                    //console.log("Taula pintada: " + pintat);
                    taulell[lastY][lastX] = 0;
                    turn = !turn;
                }

                let enviar = ["Turn", turn];
                client.send(JSON.stringify(enviar));
            }*/

            function paintH(last, cur, fix) {
                if (last < cur && last != cur) {
                    //console.log(last, cur);
                    for (last; last <= cur; last++) {
                        pintat[fix][last] = color;
                        //console.log("B1 Last X: " + last + " Curr X: " + cur);
                    }
                    //console.log(last, cur);
                    last = cur;
                }

                if (last > cur && last != cur) {

                    for (last; last >= cur; last--) {
                        pintat[fix][last] = color;
                        //console.log("B2 Last X: " + last + " Curr X: " + cur);
                    }
                    last = cur;
                }

                let enviar = ["Pintar", pintat];
                client.send(JSON.stringify(enviar));
            }

            function paintV(last, cur, fix) {
                if (last != cur) {
                    if (last < cur) {
                        for (last; last <= cur; last++) {
                            pintat[last][fix] = color;
                            //console.log("B1 Last Y: " + last + " CurrY: " + cur);
                        }
                        last = cur;
                    }

                    if (last > cur) {
                        for (last; last >= cur; last--) {
                            pintat[last][fix] = color;
                            //console.log("B2 LastY: " + last + " CurrY: " + cur);
                        }
                        last = cur;
                    }
                }

                let enviar = ["Pintar", pintat];
                client.send(JSON.stringify(enviar));
            }

            function paintDiag(idx, idy, color) {
                let x = lastX;
                let y = lastY;

                while (x <= idx && y <= idy)//Bottom Right
                {
                    pintat[y][x] = color
                    x++; y++;
                }

                x = lastX;
                y = lastY;

                //console.log(pintat);
                while (x >= idx && y < idy)//Bottom Left
                {
                    pintat[y][x] = color
                    x--; y++;
                }

                x = lastX;
                y = lastY;
                while (x <= idx && y >= idy)//Top Right
                {
                    pintat[y][x] = color
                    x++; y--;
                }

                x = lastX;
                y = lastY;

                while (x >= idx && y >= idy)//Top left
                {
                    pintat[y][x] = color
                    x--; y--;
                }
                let enviar = ["Pintar", pintat];
                client.send(JSON.stringify(enviar));
            }
        });
    });
});


function initPint() {
    for (let i = 0; i < taulellyMAX; i++) {
        var linea = [];
        for (let j = 0; j < taulellxMAX; j++) {
            linea.push(0);
        }
        pintat.push(linea);
    }
}

function initTaulell() {
    var scope = {};
    for (let i = 0; i < taulellyMAX; i++) {
        var linea = [];
        linea.push(scope['W' + i + 'q'] = new queen(i, 1, "W", "q"), scope['W' + i + 'r'] = new rook(i, 1, "W", "r"), scope['W' + i + 'b'] = new bishop(i, 2, "W", "b"), 0, 0, 0, 0, 0, 0, 0, 0, 'Wq', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, scope['B' + i + 'r'] = new rook(i, 22, "B", "r"), 'Br');
        for (let j = 0; j < taulellxMAX; j++) {
            //linea.push([ 0, 0, 0, … ]);

        }
        taulell.push(linea);
    }
}

function initSelect() {
    for (let i = 0; i < taulellyMAX; i++) {
        var linea = [];
        for (let j = 0; j < taulellxMAX; j++) {
            linea.push(0);
        }
        select.push(linea);
    }
}

function initDiag() {

    //TODO: change 2 por cada taulax o y max
    for (let i = 0; i < taulellyMAX; i++) {
        var linea = [];
        for (let j = 0; j < taulellxMAX; j++) {
            //diag.push([0,0,0,0]);
            let x = j;
            let y = i;
            var pos = [];

            while (x < taulellxMAX && y < taulellyMAX)//Bottom Right
            {
                pos.push(y++ + "." + x++);
            }
            x = j;
            y = i;

            while (x >= 0 && y < taulellyMAX)//Bottom Left
            {
                pos.push(y++ + "." + x--);
            }

            x = j;
            y = i;
            while (x < taulellxMAX && y >= 0)//Top Right
            {
                pos.push(y-- + "." + x++);
            }

            x = j;
            y = i;

            while (x >= 0 && y >= 0)//Top left
            {
                pos.push(y-- + "." + x--);
            }

            //console.log("Pos: " + pos)
            linea.push(pos);
            //console.log("Fuera While");
            //console.log(linea);
        }
        diag.push(linea)
        //console.log(diag);
    }
}
