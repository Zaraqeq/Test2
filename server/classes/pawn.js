class Pawn{

    constructor(idy, idx, color, pesa)
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
        this.pesa = pesa;  
    }
    
    moureCurt(newx, newy, limit)
    {
        if((newx <= this.idx+limit && newx >= this.idx-limit) && this.idy == newy){ //Horitzontal
            //console.log("Horitzontal"+"LastX: "+lastX+" X: "+idx);
            return true;
        }else if((newy <= this.idy+limit && newy >= this.idy-limit) && this.idx == newx){ //Vertical
            //console.log("Vertical"+"LastY: "+lastY+" Y: "+idy);
            return true;
        }else return false;
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