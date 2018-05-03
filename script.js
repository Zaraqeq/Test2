var socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
    // Send new Tweet

};

let lastX, lastY;

let colorPlayer1 = "blue";
const taulellyMAX = 4;
const taulellxMAX = 4;

window.onload = function (event) { rellenar() };
let taulell = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
socket.onmessage = function (event) {
    console.log(event.data);

    taulell = JSON.parse(event.data)

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
            if (taulell[i][x] == 'Br') {
                document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('img/rook.png')";
                //document.getElementById('pos[' + i + '][' + x + ']').style.backgroundColor = colorPlayer1;
            }
            if (taulell[i][x] == '0') document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "none";
        }
    }
}





