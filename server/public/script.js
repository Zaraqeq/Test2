var socket = io();
let lastX, lastY;

let colorPlayer1 = "#00BFFF";
let colorPlayer2 = "#FFAD00";
const taulellyMAX = 24;
const taulellxMAX = 24;

window.onload = function (event) { rellenar()};
window.onload = function (event) { createTable()};
let taulell = [];
let pint = [];

socket.on('message', function (data) {
    mess = JSON.parse(data)
    let turn;
    console.log("-->"+mess);
    if (mess[0] == "Taulell") {
        taulell = [];
        console.log("Taulell");
        taulell = mess[1];
    }
    if (mess[0] == "Pintar") {
        pint = [];
        console.log("Pintar");
        pint = mess[1];
    }
    if(mess[0]=="Turn")
    {
        console.log("Turn");
        if(mess[1]==true)
        {
            turn = "Blanc";
        }else if(mess[1]==false)
        {
            turn="Negre";
        }

        document.getElementById("Turn").innerHTML = turn;
        
    }

    if(mess[0]=="Error")
    {
        console.log("Error");
        alert(mess[1]);
    }

    rellenar();
});

function send(idy, idx) {
    let pos = [idy, idx];
    let json = JSON.stringify(pos);
    socket.emit('message',json);
}

/*function moureRect(idx, idy) {
    if (idx == lastX || idy == lastY) {
        taulell[idy][idx] = 'Br';
        taulell[lastY][lastX] = 0;
    }
}*/

function createTable()
{
    var body = document.getElementsByTagName('body')[0];
    body.setAttribute("class", "container");
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    
    for (var i = 0; i < 24; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 24; j++) {
                var td = document.createElement('td');
                td.setAttribute('id', 'pos['+i+']['+j+']');
                td.setAttribute('onclick', 'send('+i+','+j+')');
                tr.appendChild(td)
            
        }
        tbl.appendChild(tr);
    }
    
    body.appendChild(tbl);
}

function rellenar() {
    

    for (let i = 0; i < taulellyMAX; i++) {
        for (let x = 0; x < taulellxMAX; x++) {
            var pesa = taulell[i][x].color+taulell[i][x].pesa;
            switch(pesa){
                
                case '0' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "none";break;
                case 'Br' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Br.png')";break;
                case 'Wr' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Wr.png')";break;
                case 'Bb' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bb.png')";break;
                case 'Wb' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Wb.png')";break;
                case 'Bk' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bk.png')";break;
                case 'Wk' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Wk.png')";break;
                case 'Bq' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bq.png')";break;
                //case 'Wq' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Wq.png')";break;
                case 'Bp' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bp.png')";break;
                case 'Wp' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Wp.png')";break;
                case 'Bh' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bh.png')";break;
                case 'Wh' : document.getElementById('pos[' + i + '][' + x + ']').style.backgroundImage = "url('/Bh.png')";break;
            }

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