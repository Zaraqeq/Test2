class Pawn {

    constructor(idy, idx, color, pesa) {
        this.idx = idx;
        this.idy = idy;
        this.color = color;
        this.pesa = pesa;
    }

    moureCurt(newx, newy, limit, board, color) {
        if ((newx <= this.idx + limit && newx >= this.idx - limit) && this.idy == newy) { //Horitzontal
            //console.log("Horitzontal"+"this.idx: "+this.idx+" X: "+idx);
            paintH(this.idx, newx, newy, this.color);
            paintV(this.idy, newy, newx, this.color);
            this.idx = newx;
            this.idy = newy;
            return true;
        } else if ((newy <= this.idy + limit && newy >= this.idy - limit) && this.idx == newx) { //Vertical
            //console.log("Vertical"+"this.idy: "+this.idy+" Y: "+idy);
            paintH(this.idx, newx, newy, this.color);
            paintV(this.idy, newy, newx, this.color);
            this.idx = newx;
            this.idy = newy;
            return true;
        } else return false;
    }

    moureCurtDiag(newx, newy) {

        if ((newx == this.idx + 2 && newy == this.idy + 2) || (newx == this.idx + 1 && newy == this.idy + 1)) {
            console.log("Botom Right");
            this.idx = newx;
            this.idy = newy;
            return true;
        } else if ((newx == this.idx - 2 && newy == this.idy + 2) || (newx == this.idx - 1 && newy <= this.idy + 1)) {
            this.idx = newx;
            this.idy = newy;
            return true;
        } else if ((newx == this.idx + 2 && newy == this.idy - 2) || (newx == this.idx + 1 && newy == this.idy - 1)) {
            this.idx = newx;
            this.idy = newy;
            return true;
        } else if ((newx == this.idx - 2 && newy == this.idy - 2) || (newx == this.idx - 1 && newy == this.idy - 1)) {
            this.idx = newx;
            this.idy = newy;
            return true;
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

module.exports = Pawn;