class Torre{

    constructor(idy, idx, color, pesa)
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
        this.pesa = pesa;   
    }
    

    movRect(newx, newy)
    {
        //console.log("Mov"+this.idy);
        if (this.idx == newx || this.idy == newy) {
            this.idx = newx;
            this.idy = newy;
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

module.exports = Torre;