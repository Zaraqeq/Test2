class Pawn{

    constructor()
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
        this.pesa = pesa;  
    }
    
    moureCurt(newx, )
    {
        if((idx <= lastX+limit && idx >= lastX-limit) && lastY == idy){ //Horitzontal
            //console.log("Horitzontal"+"LastX: "+lastX+" X: "+idx);
            return true;
        }else if((idy <= lastY+limit && idy >= lastY-limit) && lastX == idx){ //Vertical
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