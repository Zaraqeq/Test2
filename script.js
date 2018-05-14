var socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
    // Send new Tweet

};

let lastX, lastY;

let colorPlayer1 = "#00BFFF";
let colorPlayer2 = "#FFAD00";
const taulellyMAX = 4;
const taulellxMAX = 4;

window.onload = function (event) { rellenar() };
let taulell = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
let pint = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
socket.onmessage = function (event) {
    mess = JSON.parse(event.data)

    if (mess[0] == "Taulell") {
        taulell = mess[1];
    } else if (mess[0] == "Pintar") {
        pint = mess[1];
    }

    rellenar();
};

function send(idy, idx) {
    let pos = [idy, idx];
    let json = JSON.stringify(pos);
    socket.send(json);
}

/*function moureRect(idx, idy) {
    if (idx == lastX || idy == lastY) {
        taulell[idy][idx] = 'Br';
        taulell[lastY][lastX] = 0;
    }
}*/


function rellenar() {
    for (let i = 0; i < taulellyMAX; i++) {
        for (let x = 0; x < taulellxMAX; x++) {
            switch(taulell[i][x]){
                case '0' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "none";break;
                case 'Br' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Br.png')";break;
                case 'Wr' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wr.png')";break;
                case 'Bb' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Bb.png')";break;
                case 'Wb' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wb.png')";break;
                case 'Bk' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Bk.png')";break;
                case 'Wk' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wk.png')";break;
                case 'Bq' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Bq.png')";break;
                case 'Wq' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wq.png')";break;
                case 'Bp' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Bp.png')";break;
                case 'Wp' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wp.png')";break;
                case 'Bh' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Bh.png')";break;
                case 'Wh' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/Wh.png')";break;
            }
            if (taulell[i][x] == '0') document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "none";
            if(pint[i][x]==1)
            {
                document.getElementById('pos[' + i + '][' + x + ']').style.backgroundColor = colorPlayer1;
            } 
            if(pint[i][x]==2)
            {
                document.getElementById('pos[' + i + '][' + x + ']').style.backgroundColor = colorPlayer2;
            } 
        }
    }
}





