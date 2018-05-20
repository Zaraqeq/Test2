class Torre {

    constructor(idy, idx, color, pesa) {
        this.idx = idx;
        this.idy = idy;
        this.color = color;
        this.pesa = pesa;
    }


    movRect(newx, newy, taulell, enemic, board, color) {
        var trobatP = false;
        //console.log("Mov"+this.idy);
        if (this.idx == newx || this.idy == newy) {
            let x = this.idx;
            let y = this.idy;
            if (this.idx == newx && newy < this.idy)//Vert Superior
            {
                /*console.log("Entra if Vert SUP");
                console.log("Y: " + y + " Newy: " + newy);*/
                while (y > newy + 1 && trobatP == false) {
                    //console.log("holi" + taulell[y][x]);
                    y--;
                    if (taulell[y][x] != 0) {
                        //console.log("Trobat");
                        trobatP = true;
                    }

                }
            }

            if (this.idx == newx && newy > this.idy)//Vert Inferior
            {
               /* console.log("Y: " + y + " Newy: " + newy);
                console.log("Entra if Vert INF");*/
                while (y < newy - 1 && trobatP == false) {
                    y++;
                    //console.log(taulell[y][x]);
                    if (taulell[y][x] != 0) {
                        //console.log("Trobat");
                        trobatP = true;
                    }

                }
            }

            if (this.idy == newy && newx < this.idx)//Vert Inferior
            {
               /* console.log("Y: " + y + " Newy: " + newy);
                console.log("Entra if Hor Dret");*/
                while (x > newx + 1 && trobatP == false) {
                    x--;
                    //console.log(taulell[y][x]);
                    if (taulell[y][x] != 0) {
                        //console.log("Trobat");
                        trobatP = true;
                    }

                }
            }

            if (this.idy == newy && newx > this.idx)//Vert Inferior
            {
                /*console.log("Y: " + y + " Newy: " + newy);
                console.log("Entra if Vert INF");*/
                while (x < newx - 1 && trobatP == false) {
                    x++;
                    //console.log(taulell[y][x]);
                    if (taulell[y][x] != 0) {
                        //console.log("Trobat");
                        trobatP = true;
                    }

                }
            }
            //console.log(taulell[newy][newx].color);
            if (trobatP == false && taulell[newy][newx].color == enemic) {
                paintH(this.idx, newx, newy, this.color);
                paintV(this.idy, newy, newx, this.color);
                this.idx = newx;
                this.idy = newy;
                return true;
            } else if (trobatP == false) {
                paintH(this.idx, newx, newy, this.color);
                paintV(this.idy, newy, newx, this.color);
                //console.log(trobatP);
                this.idx = newx;
                this.idy = newy;
                return true;
            } else return false;

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

module.exports = Torre;