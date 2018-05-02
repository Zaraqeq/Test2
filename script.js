/*var socket = new WebSocket('ws://localhost:3000');
socket.onopen = function () {
// Send new Tweet

};*/
const taulellyMAX = 4;
const taulellxMAX = 4;
let lastX, lastY;

let colorPlayer1 = "blue";

window.onload = function(event){rellenar()};

/*socket.onmessage = function(event) {
     alert(event.data);   
};*/

function send(idy, idx)
{
    
    if(taulell[idy][idx] != 0)
    {
        vaciar();
        select[idy][idx]=1;
        console.log(select);
        lastX = idx;
        lastY = idy;
    }else if(taulell[idy][idx] == 0 && select[lastY][lastX])
    {
        //console.log("Anterior: "+taulell);
        //console.log('Selected: '+select);
        if(taulell[lastY][lastX]=='Br') moureRect(idx, idy);
        console.log("Nou: "+taulell); 
        vaciar();
        //console.log('Selected: '+select);
        rellenar();
    }
    

    //alert(select);
    //let json = JSON.stringify(taulell);

    //socket.send(json);
}

function moureRect(idx, idy)
{
    if(idx==lastX || idy == lastY)
    {
        taulell[idy][idx]='Br';
        taulell[lastY][lastX]=0;
    } 
}


function rellenar()
{
    for(let i=0; i<taulellyMAX; i++)
    {
        for(let x=0; x<taulellxMAX; x++)
        {
            if(taulell[i][x]=='Br')
            {
                document.getElementById('pos['+i+']['+x+']').style.backgroundImage = "url('img/rook.png')";
                document.getElementById('pos['+i+']['+x+']').style.backgroundColor = colorPlayer1;
            }
            if(taulell[i][x]=='0') document.getElementById('pos['+i+']['+x+']').style.backgroundImage = "none";
        }
    }
}

function vaciar()
{
    for(let i=0; i<taulellyMAX; i++)
    {
        for(let x=0; x<taulellxMAX; x++)
        {
            select[i][x] = 0;
        }
    }
}



