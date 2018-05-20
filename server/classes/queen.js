class Queen{

    constructor(idy, idx, color, pesa)
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
        this.pesa = pesa;   
    }
    
    comprDiag(newx, newy, diag)
    {
        var trobat = false;
        let i = 0;
        while (trobat == false && i < diag[this.idy][this.idx].length) {
            var str = diag[this.idy][this.idx][i];
            let num = str.split(".");
    
            //console.log(diag[lastY][lastX][i].charAt(0) + diag[lastY][lastX][i].charAt(2));
            if (num[0] == newy && num[1] == newx) trobat = true;
            //console.log("Num0: "+num[0]+" Num1: "+num[1]);
            i++;
        }

        return trobat;
    }

    movDiag(newx, newy, diag, taulell, enemic, aliat, board)
    {
        var trobat = false;
        var trobatP = false;
        var trobatE = false;
        let i = 0;

        //console.log(diag);
        while (trobat == false && i < diag[this.idy][this.idx].length) {
            var str = diag[this.idy][this.idx][i];
            let num = str.split(".");
            //console.log("Y: " + num[0] + " Y Actual: " + newy + " | X: " + num[1] + " X Actual: " + newx);
            //console.log(diag[lastY][lastX][i].charAt(0) + diag[lastY][lastX][i].charAt(2));
            if (num[0] == newy && num[1] == newx) {
                trobat = true;
                //console.log("Trobat");
            }
            //console.log("Num0: "+num[0]+" Num1: "+num[1]);
            i++;
        }
        //console.log("Mov"+this.idy);
        if (trobat == true) {
            let x =this.idx;
            let y = this.idy;
            if (this.idx < newx && this.idy < newy) {
                console.log("Entra if Botom Right");
                
                while (x <= newx && y <= newy && trobatP == false){
                    x++; y++;
                    if (taulell[y][x]!=0) trobatP = true;
                    
                    
                }//Bottom Right
            }
            console.log("Y: "+y+" X: "+x+" newX: "+newx+" newY: "+newy);
            if (this.idx > newx && this.idy < newy) {
                console.log("Entra if Botom Left");
                while (x > newx && y < newy && trobatP == false)//Bottom Left
                {
                    x--; y++;
                    if (taulell[y][x] != 0) trobatP = true;
                    
                }
            }

            if (this.idx < newx && this.idy > newy) {
                console.log("Entra if Top Right");
                while (x < newx && y > newy && trobatP == false)//Top Right
                {
                    console.log(taulell[y][x]);
                    x++; y--;
                    if (taulell[y][x] != 0) trobatP = true;
                    
                }
            }

            if (this.idx > newx && this.idy > newy) {
                console.log("Entra if Top Left");
                while (x < newx && y < newy && trobatP == false)//Bottom Right
                {
                    x++; y++;
                    if (taulell[y][x] != 0) trobatP = true;
                   
                }
            }

            

            //if(trobatE==true && trobatP==true) trobatP = false; //Mata enemic en diagonal amb la comprobacio de colisio

            if (trobatP == false) {
                paintDiag(newx, newy,this.idx, this.idy, this.color);
                this.idx = newx;
                this.idy = newy;
                return true;
            } else return false
        } else return false;
    }

    movRect(newx, newy, taulell, enemic)
    {
        var trobatP = false;
        //console.log("Mov"+this.idy);
        if (this.idx == newx || this.idy == newy) {
            let x = this.idx;
            let y = this.idy;
            if (this.idx == newx && newy < this.idy)//Vert Superior
            {
                console.log("Entra if Vert SUP");
                console.log("Y: "+y+" Newy: "+newy);
                while (y > newy+1 && trobatP == false)
                {
                    //console.log("holi" + taulell[y][x]);
                    y--;
                    if (taulell[y][x] != 0)
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                   
                }
            }

            if (this.idx == newx && newy > this.idy)//Vert Inferior
            {
                console.log("Y: "+y+" Newy: "+newy);
                console.log("Entra if Vert INF");
                while (y < newy-1 && trobatP == false)
                {
                    y++;
                    console.log(taulell[y][x]);
                    if (taulell[y][x] != 0 ) 
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                    
                }
            }

            if (this.idy == newy && newx < this.idx)//Vert Inferior
            {
                console.log("Y: "+y+" Newy: "+newy);
                console.log("Entra if Hor Dret");
                while (x > newx+1 && trobatP == false)
                {
                    x--;
                    console.log(taulell[y][x]);
                    if (taulell[y][x] != 0 ) 
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                    
                }
            }

            if (this.idy == newy && newx > this.idx)//Vert Inferior
            {
                console.log("Y: "+y+" Newy: "+newy);
                console.log("Entra if Vert INF");
                while (x < newx-1 && trobatP == false)
                {
                    x++;
                    console.log(taulell[y][x]);
                    if (taulell[y][x] != 0 ) 
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                    
                }
            }
            console.log(taulell[newy][newx].color);
            if(trobatP==false && taulell[newy][newx].color == enemic)
            {
                paintH(this.idx, newx, newy, this.color);
                paintV(this.idy, newy, newx, this.color);
                this.idx = newx;
                this.idy = newy;
                return true;
            }else if(trobatP==false)
            {
                paintH(this.idx, newx, newy, this.color);
                paintV(this.idy, newy, newx, this.color);
                console.log(trobatP);
                this.idx = newx;
                this.idy = newy;
                return true;
            }else return false;
            
        } else return false;
    }

    col()
    {
        //console.log(this.color);
        return this.color;
    }

    pieceType()
    {
        return this.pesa;
    }

    
    

} 

function paintH(last, cur, fix, color) {
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
    //console.log(board.pintat);
    //console.log("Pintar");
}

function paintV(last, cur, fix, color) {
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
}

function paintDiag(newx, newy, idx, idy, color) {
    console.log(board.pintat);
    let x = idx;
    let y = idy;
    console.log("X: "+x+" Y: "+y+" newX:"+newx+" newY:"+newy+"COlor: "+color);
    while (x <= newx && y <= newy)//Bottom Right
    {
        console.log(board.pintat);
        board.pintat[y][x] = color;
        x++; y++;
    }

    x = idx;
    y = idy;

    //console.log(pintat);
    while (x >= newx && y < newy)//Bottom Left
    {
        board.pintat[y][x] = color;
        x--; y++;
    }

    x = idx;
    y = idy;
    while (x <= newx && y >= newy)//Top Right
    {
        board.pintat[y][x] = color;
        x++; y--;
    }
    

    x = idx;
    y = idy;

    while (x >= newx && y >= newy)//Top left
    {
        board.pintat[y][x] = color;
        x--; y--;
    }
}

module.exports = Queen;