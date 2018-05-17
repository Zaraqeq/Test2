class Bishop{

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

module.exports = Bishop;