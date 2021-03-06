const rook = require('./rook.js');
const queen = require('./queen.js');
const bishop = require('./bishop.js');
const paw = require('./pawn.js');
const king = require('./king.js');
const taulellxMAX = 24;
const taulellyMAX = 24;
class Board {

    constructor() {
        this.taulell = [];
        this.pintat = [];
        this.select = [];
        this.diag = [];
    }
    
    initTaulell() {
        let scope = {};
        for (let i = 0; i < taulellyMAX; i++) {
            let linea = [];
            linea.push(scope['W' + i + 'q'] = new queen(i, 1, "W", "q"), scope['W' + i + 'r'] = new rook(i, 1, "W", "r"), scope['W' + i + 'b'] = new bishop(i, 2, "W", "b"), scope['W' + i + 'r'] = new rook(i, 3, "W", "r"), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, scope['B' + i + 'p'] = new paw(i, 21, "B", "p"), scope['B' + i + 'r'] = new rook(i, 22, "B", "r"), 0);
            /* for (let j = 0; j < taulellxMAX; j++) {
                //linea.push([ 0, 0, 0, … ]);
            }*/
            this.taulell.push(linea);
        }
        //console.log(this.taulell);
        //return this.taulell;
    }

    initSelect() {
        for (let i = 0; i < taulellyMAX; i++) {
            let linea = [];
            for (let j = 0; j < taulellxMAX; j++) {
                linea.push(0);
            }
            this.select.push(linea);
        }
    }

    vaciar() {
        for (let i = 0; i < taulellyMAX; i++) {
            for (let x = 0; x < taulellxMAX; x++) {
                this.select[i][x] = 0;
            }
        }
    }

    initDiag() {

        for (let i = 0; i < taulellyMAX; i++) {
            let linea = [];
            for (let j = 0; j < taulellxMAX; j++) {
                //diag.push([0,0,0,0]);
                let x = j;
                let y = i;
                let pos = [];

                while (x < taulellxMAX && y < taulellyMAX)//Bottom Right
                {
                    pos.push(y++ + "." + x++);
                }
                x = j;
                y = i;

                while (x >= 0 && y < taulellyMAX)//Bottom Left
                {
                    pos.push(y++ + "." + x--);
                }

                x = j;
                y = i;
                while (x < taulellxMAX && y >= 0)//Top Right
                {
                    pos.push(y-- + "." + x++);
                }

                x = j;
                y = i;
                while (x >= 0 && y >= 0)//Top left
                {
                    pos.push(y-- + "." + x--);
                }

                //console.log("Pos: " + pos)
                linea.push(pos);
                //console.log("Fuera While");
                //console.log(linea);
            }
            this.diag.push(linea)
            //console.log(diag);
        }


    }
    initPint() {
        for (let i = 0; i < taulellyMAX; i++) {
            var linea = [];
            for (let j = 0; j < taulellxMAX; j++) {
                linea.push(0);
            }
            this.pintat.push(linea);
        }
    }
}

module.exports = Board;