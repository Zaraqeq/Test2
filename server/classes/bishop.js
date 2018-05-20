class Bishop {

    constructor(idy, idx, color, pesa) {
        this.idx = idx;
        this.idy = idy;
        this.color = color;
        this.pesa = pesa;
    }

    comprDiag(newx, newy, diag) {
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

    movDiag(newx, newy, diag, taulell, enemic, aliat) {
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
                this.idx = newx;
                this.idy = newy;
                return true;
            } else return false
        } else return false;
    }

    col() {
        //console.log(this.color);
        return this.color;
    }

    pieceType() {
        return this.pesa;
    }




}

module.exports = Bishop;