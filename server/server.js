//import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';

var WebSocket = require('ws'),
    server = new WebSocket.Server({
        port: 3000,
    });
var turn = true;
var taulell = [
    ['Wb', 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    ['Br', 0, 0, 'Wr']
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

let diag = [];

let lastX = 0, lastY = 0;
const taulellyMAX = 4;
const taulellxMAX = 4;
var turn=true;
let color;
console.log((new Date()) + "WebSocket Server is listening on port 3000");

server.on('connection', function connection(ws) {
    console.log('Conected');
    let table = ["Taulell", taulell];
    ws.send(JSON.stringify(table));
    let enviar = ["Pintar", pintat];
    ws.send(JSON.stringify(enviar));
    initDiag();

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
            } else if (taulell[idy][idx] == 0 && select[lastY][lastX] == 1) { //color 1 = yellow
                //console.log("Anterior: "+taulell);
                //console.log('Selected: '+select);
                if(turn) color=1;
                else color=2;
                if (taulell[lastY][lastX].startsWith("W") && color==1){
                    if (taulell[lastY][lastX].endsWith("r")){
                        moureRect(idx, idy, "Wr");
                    }else if (taulell[lastY][lastX].endsWith("b")){
                        //moureDiag(idx,idy,"Wb");
                    }
                }else if(taulell[lastY][lastX].startsWith("B") && color==2){
                    if (taulell[lastY][lastX].endsWith("r")){
                        moureRect(idx, idy, "Br");
                    } 
                }
                
                console.log("Nou: " + taulell);
                vaciar();
                //console.log('Selected: '+select);
                //rellenar();
            }
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


            /*
            function moureDiag(idx, idy, piece){
                if(idx != lastX && idy != lastY){
                    taulell[idy][idx] = piece;
                    paintDiagBR(idx, idy); //BR = Bottom Right
                    /*
                    paintDiagBL(idx, idy); //BL = Bottom Left
                    paintDiagTR(idx, idy); //TR = Top Right
                    paintDiagTL(idx, idy); //TL = Top Left
                    console.log("Taula pintada: " + pintat);
                    taulell[lastY][lastX] = 0;
                    trun=!turn;
                }
            }
            //TODO: BUCLES COMPROVACIO DIAGONAL
            function paintDiagBR(idx, idy){
                for(lastX; lastX>=idx; lastX++){
                        for(lastY; idy>=lastY; lastY++){
                            pintar[lastY][lastX] = color;
                    }
                }
                lastX = idx;
                lastY = idy;
                let enviar = ["Pintar", pintat];
                ws.send(JSON.stringify(enviar));
            }*/

            function moureRect(idx, idy, piece) {
                if (idx == lastX || idy == lastY) {
                    taulell[idy][idx] = piece;
                    paintH(lastX, idx, idy);
                    paintV(lastY, idy, idx);
                    console.log("Taula pintada: " + pintat);
                    taulell[lastY][lastX] = 0;
                    turn=!turn;
                }
            }

            function paintH(last, cur, fix) {
                if (last < cur && last != cur) {
                    console.log(last, cur);
                    for (last;last <= cur; last++) {
                        pintat[fix][last] = color;
                        console.log("B1 Last X: " + last + " Curr X: " + cur);
                    }
                    console.log(last, cur);
                    last=cur;
                }
                
                if (last > cur && last != cur) {

                    for (last; last >= cur; last--) {
                        pintat[fix][last] = color;
                        console.log("B2 Last X: " + last + " Curr X: " + cur);
                    }
                    last=cur;
                }

                let enviar = ["Pintar", pintat];
                ws.send(JSON.stringify(enviar));
            }

            function paintV(last, cur, fix) {
                if (last != cur) {
                    if (last < cur) {
                        for (last; last <= cur; last++) {
                            pintat[last][fix] = color;
                            console.log("B1 Last Y: " + last + " CurrY: " + cur);
                        }
                        last=cur;
                    }

                    if (last > cur) {
                        for (last; last >= cur; last--) {
                            pintat[last][fix] = color;
                            console.log("B2 LastY: " + last + " CurrY: " + cur);
                        }
                        last=cur;
                    }
                }

                let enviar = ["Pintar", pintat];
                client.send(JSON.stringify(enviar));
            }

            function paintD(last, cur){

            }
        });
    });
});

function initDiag(){
    //TODO: change 2 por cada taulax o y max
    for(let i=0; i<taulellyMAX; i++){
        for(let j=0; j<taulellxMAX; j++){
            //diag.push([0,0,0,0]);
            let x=j;
            let y=i;
            var pos = [];
            var linea = [];
            while(x<taulellxMAX && y<taulellyMAX)//Bottom Right
            {
                pos.push(y++ +"."+ x++);
            }
            x=j;
            y=i;
            while(x>=0 && y<taulellyMAX)//Bottom Left
            {
                pos.push(y++ +"."+ x--);
            }

            x=j;
            y=i;
            while(x<taulellxMAX && y>=0)//Top Right
            {
                pos.push(y-- +"."+ x++);
            }

            x=j;
            y=i;
            while(x>=0 && y>=0)//Top left
            {
                pos.push(y-- +"."+ x--);
            }

            console.log("Pos: "+pos)
            linea.push(pos);
            //console.log("Fuera While");
            //console.log(diag);
        }
        diag.push(linea)
    }

    
}
