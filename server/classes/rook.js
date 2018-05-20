class Torre{

    constructor(idy, idx, color, pesa)
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
        this.pesa = pesa;   
    }
    

    movRect(newx, newy, taulell)
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
                while (y >= newy && trobatP == false)
                {
                    console.log(taulell[y][x]);
                    if (taulell[y][x] != 0)
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                    y--;
                }
            }

            if (this.idx == newx && newy > this.idy)//Vert Inferior
            {
                console.log("Y: "+y+" Newy: "+newy);
                console.log("Entra if Vert INF");
                while (y <= newy && trobatP == false)
                {
                    console.log(taulell[y][x]);
                    if (taulell[y][x] != 0) 
                    {
                        console.log("Trobat");
                        trobatP = true;
                    } 
                    y++;
                }
            }
            if(trobatP==false)
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

module.exports = Torre;