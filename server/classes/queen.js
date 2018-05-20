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

    movDiag(newx, newy, diag)
    {
        var trobat = false;
        let i = 0;
        console.log(diag);
        while (trobat == false && i < diag[this.idy][this.idx].length) {
            var str = diag[this.idy][this.idx][i];
            let num = str.split(".");
            console.log("Y: "+num[0]+" Y Actual: "+newy+" | X: "+num[1]+" X Actual: "+newx);
            //console.log(diag[lastY][lastX][i].charAt(0) + diag[lastY][lastX][i].charAt(2));
            if (num[0] == newy && num[1] == newx) 
            {
                trobat = true; 
                console.log("Trobat");
            }
            //console.log("Num0: "+num[0]+" Num1: "+num[1]);
            i++;
        }
        //console.log("Mov"+this.idy);
        if(trobat==true){
            this.idx=newx;
            this.idy=newy;
            return true;
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
                
                this.idx = newx;
                this.idy = newy;
                return true;
            }else if(trobatP==false)
            {
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

module.exports = Queen;