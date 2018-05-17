class Torre{


    constructor(idy, idx, color)
    {
        this.idx=idx; 
        this.idy=idy; 
        this.color = color;
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
        return "r";
    }

} 

module.exports = Torre;