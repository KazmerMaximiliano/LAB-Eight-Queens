export default function(n) {
    // VALIDATORS
    if(!n) throw new Error('El argumento "n" es requerido');

    // PRIVATE
    var step = 1;
    const queensNumber = n;
    const blueQueens = [];
    const redQueen = {
        x: 1,
        y: 1,
        dp: 2,
        dn: 0
    }

    this.setQueens = function() {
        return {
            redQueen: setRedQueen(),
            blueQueens: setBlueQueens()
        }
    }

    const setRedQueen = function() {
        
        if(blueQueens.length < queensNumber) {
            if(availablePosition()) {
                blueQueens.push({
                    x: redQueen.x,
                    y: redQueen.y,
                    dp: redQueen.dp,
                    dn: redQueen.dn
                });
                updateRedQueen('x');
            } else {
                if(redQueen.y < queensNumber) {
                    updateRedQueen('y');
                } else {
                    updateRedQueen('xy');
                }
            }

            step++;
        }

        return redQueen;
    }

    const setBlueQueens = function() {
        return blueQueens;
    }

    const availablePosition = function() {
        let found = blueQueens.find(
            e => e.x === redQueen.x || 
                e.y === redQueen.y || 
                e.dp === redQueen.dp || 
                e.dn === redQueen.dn
        );
    
        return found === undefined;
    }

    const updateRedQueen = function(axis) {
        switch (axis) {
            case 'x':
                if(redQueen.x < queensNumber) {
                    redQueen.x +=1;
                    redQueen.y = 1;
                }
                break;
            case 'y':
                redQueen.y +=1;
                break;
            case 'xy':
                let auxQueen = blueQueens[blueQueens.length - 1];
                if(auxQueen.y < n) {
                    blueQueens.splice(blueQueens.length - 1, 1);
                    redQueen.x = auxQueen.x;
                    redQueen.y = auxQueen.y + 1;
                } else if(blueQueens[0].y < n) {
                    blueQueens.splice(blueQueens.length - 1, 1);
                    auxQueen = blueQueens[blueQueens.length - 1];
                    blueQueens.splice(blueQueens.length - 1, 1);
                    redQueen.x = auxQueen.x;
                    redQueen.y = auxQueen.y + 1;
                } else {
                    throw new Error('NO HAY SOLUCION ?');
                }
                break;
            default:
                break;
        }

        redQueen.dp = redQueen.x + redQueen.y;
        redQueen.dn = redQueen.y - redQueen.x;
    }

    this.getSteps = function() {
        return step;
    }
}