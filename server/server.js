//import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
const rook = require(__dirname + '/classes/rook.js');
const bishop = require(__dirname + '/classes/bishop.js');
const queen = require(__dirname + '/classes/queen.js');
const boar = require(__dirname + '/classes/board.js');

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/img'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/test.html');
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
var usu = [];
var turnAct = 0;
var numUsu = 0;
console.log((new Date()) + "WebSocket Server is listening on port 3000");

io.on('connection', function (socket) {
    board = new boar();
    board.initDiag();
    //console.log(board.taulell);
    board.initTaulell();
    //console.log(board.taulell);
    board.initPint();
    //console.log(board.pintat);
    board.initSelect();
    //console.log(board.select);


    console.log('Conected');
    let table = ["Taulell", board.taulell];
    socket.emit('message', JSON.stringify(table));
    let enviar = ["Pintar", board.pintat];
    socket.emit('message', JSON.stringify(enviar));
    let turnMes = ["Turn", turn];
    socket.emit('message', JSON.stringify(turnMes));

    usu[numUsu] = socket.id;
    numUsu++;
    socket.on('message', function incoming(data) {
        // Broadcast to everyone else.
        //console.log("Rebut: " + data);

        //console.log("Turn: "+turn);
        if (turn == true) {
            turnAct = 0;
        } else turnAct = 1;

        //if (socket.id == usu[turnAct] && numUsu==2) {
        let pos = JSON.parse(data);
        let idy = pos[0];
        let idx = pos[1];
        //console.log(click);
        //click=false;
        if (board.taulell[idy][idx] != 0 && board.select[lastY][lastX] == 0) {
            vaciar();
            //console.log("He entrat");
            board.select[idy][idx] = 1;
            //let pesa = taulell[lastY][lastX];
            //taulell[idy][idx].movRect();
            //console.log(taulell[idy][idx].movRect());
            if (board.taulell[idy][idx].col() == "W") {
                enemic = "B";

            } else if (board.taulell[idy][idx].col() == "B") {
                enemic = "W";
            }
            //console.log(enemic);
            //console.log("Enemic: "+enemic+" Pesa: "+pesa);
            lastX = idx;
            lastY = idy;

            click = true
        } else if ((board.taulell[idy][idx] == 0 || board.taulell[idy][idx].col() == enemic) && board.select[lastY][lastX] == 1) { //color 1 = yellow
            //console.log(taulell[idy][idx]);
            //console.log("Anterior: "+taulell);
            //console.log("Enemic: " + enemic);
            //console.log("He entrat 2");
            if (turn) color = 1;
            else color = 2;

            if (board.taulell[lastY][lastX].col() == "W" && turn == true) {
                if (board.taulell[lastY][lastX].pieceType() == "r" && board.taulell[lastY][lastX].movRect(idx, idy, board.taulell, enemic, board, color)) {
                    board.taulell[idy][idx] = board.taulell[lastY][lastX];
                    board.taulell[lastY][lastX] = 0;
                    turn = !turn;
                } else if (board.taulell[lastY][lastX].pieceType() == "b" && board.taulell[lastY][lastX].movDiag(idx, idy, board.diag, board.taulell)) {
                    board.taulell[idy][idx] = board.taulell[lastY][lastX];
                    board.taulell[lastY][lastX] = 0;
                    turn = !turn;
                } else if (board.taulell[lastY][lastX].pieceType() == "q" && (board.taulell[lastY][lastX].movDiag(idx, idy, board.diag) || board.taulell[lastY][lastX].movRect(idx, idy,board.taulell, enemic))) {
                    board.taulell[idy][idx] = board.taulell[lastY][lastX];
                    board.taulell[lastY][lastX] = 0;
                    //paintH(lastX, idx, idy);
                    //paintV(lastY, idy, idx);
                    paintDiag(idx, idy, color);
                    turn = !turn;

                } else if (board.taulell[lastY][lastX].pieceType() == "p" && board.taulell[lastY][lastX].moureCurt(idx, idy, 2, board, color)) {
                    board.taulell[idy][idx] = board.taulell[lastY][lastX];
                    board.taulell[lastY][lastX] = 0;
                    turn = !turn;
                } else {
                    let error = ["Error", "Moviment Invalid"];
                    socket.emit('message', JSON.stringify(error));
                    socket.broadcast.emit('message', JSON.stringify(error));
                }
            } else if (board.taulell[lastY][lastX].col() == "B" && turn == false) {
                if (board.taulell[lastY][lastX].pieceType() == "r" && board.taulell[lastY][lastX].movRect(idx, idy, board.taulell, board, color)) {
                    board.taulell[idy][idx] = board.taulell[lastY][lastX];
                    board.taulell[lastY][lastX] = 0;
                    turn = !turn;

                    //moureRect(idx, idy, "Br");
                } else if (board.taulell[lastY][lastX].pieceType() == "p") {
                    if (board.taulell[idy][idx] != 0 && board.taulell[idy][idx].col() == enemic ) {
                        if (board.taulell[lastY][lastX].moureCurtDiag(idx, idy)) {
                            board.taulell[idy][idx] = board.taulell[lastY][lastX];
                            board.taulell[lastY][lastX] = 0;
                            turn = !turn;
                        }
                    }else {
                        if (board.taulell[lastY][lastX].moureCurt(idx, idy, 2)) {
                            board.taulell[idy][idx] = board.taulell[lastY][lastX];
                            board.taulell[lastY][lastX] = 0;
                            turn = !turn;
                        }
                    }/*else if (taulell[lastY][lastX].endsWith("b")) {
                        moureDiag(idx, idy, "Bb");
                    } else if (taulell[lastY][lastX].endsWith("q")) {
                        moureDiag(idx, idy, "Bq");
                        moureRect(idx, idy, "Bq");
                    }*/
                }
            }

                //console.log("Nou: " + taulell);
                vaciar();
                //console.log('Selected: '+select);

                board.select[lastY][lastX] = 0;

            }

            //click=false;
            //console.log(taulell);
            let table = ["Taulell", board.taulell];
            //console.log("JSON= " + myJsonString);
            socket.emit('message', JSON.stringify(table));
            socket.broadcast.emit('message', JSON.stringify(table));

            let pint = ["Pintar", board.pintat];
            //console.log("JSON= " + myJsonString);
            socket.emit('message', JSON.stringify(pint));
            socket.broadcast.emit('message', JSON.stringify(pint));

            function vaciar() {
                for (let i = 0; i < taulellyMAX; i++) {
                    for (let x = 0; x < taulellxMAX; x++) {
                        board.select[i][x] = 0;
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

            /*function paintH(last, cur, fix) {
                if (last < cur && last != cur) {
                    //console.log(last, cur);
                    for (last; last <= cur; last++) {
                        board.pintat[fix][last] = color;
                        //console.log("B1 Last X: " + last + " Curr X: " + cur);
                    }
                    //console.log(last, cur);
                    last = cur;
                }

                if (last > cur && last != cur) {

                    for (last; last >= cur; last--) {
                        board.pintat[fix][last] = color;
                        //console.log("B2 Last X: " + last + " Curr X: " + cur);
                    }
                    last = cur;
                }
                //console.log("Pintar");
                let enviar = ["Pintar", board.pintat];
                socket.emit('message', JSON.stringify(enviar));
                socket.broadcast.emit('message', JSON.stringify(enviar));
            }

            function paintV(last, cur, fix) {
                if (last != cur) {
                    if (last < cur) {
                        for (last; last <= cur; last++) {
                            board.pintat[last][fix] = color;
                            //console.log("B1 Last Y: " + last + " CurrY: " + cur);
                        }
                        last = cur;
                    }

                    if (last > cur) {
                        for (last; last >= cur; last--) {
                            board.pintat[last][fix] = color;
                            //console.log("B2 LastY: " + last + " CurrY: " + cur);
                        }
                        last = cur;
                    }
                }

                let enviar = ["Pintar", board.pintat];
                socket.emit('message', JSON.stringify(enviar));
                socket.broadcast.emit('message', JSON.stringify(enviar));
            }*/

            function paintDiag(idx, idy, color) {
                let x = lastX;
                let y = lastY;

                while (x <= idx && y <= idy)//Bottom Right
                {
                    board.pintat[y][x] = color
                    x++; y++;
                }

                x = lastX;
                y = lastY;

                //console.log(pintat);
                while (x >= idx && y < idy)//Bottom Left
                {
                    board.pintat[y][x] = color
                    x--; y++;
                }

                x = lastX;
                y = lastY;
                while (x <= idx && y >= idy)//Top Right
                {
                    board.pintat[y][x] = color
                    x++; y--;
                }

                x = lastX;
                y = lastY;

                while (x >= idx && y >= idy)//Top left
                {
                    board.pintat[y][x] = color
                    x--; y--;
                }
                let enviar = ["Pintar", board.pintat];
                socket.emit('message', JSON.stringify(enviar));
                socket.broadcast.emit('message', JSON.stringify(enviar));
            }
            // }
        });
});

http.listen(8082, function () {
    console.log('listening on localhost:8082');
});

/*function initPint() {
    pintat = [];
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
    taulell = [];
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
    select = [];
    for (let i = 0; i < taulellyMAX; i++) {
        var linea = [];
        for (let j = 0; j < taulellxMAX; j++) {
            linea.push(0);
        }
        select.push(linea);
    }
}

function initDiag() {
    diag = [];
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
}*/
