export default function(rows, size) {
    // VALIDATORS
    if(!rows) throw new Error('El argumento "rows" es requerido');
    if(!size) throw new Error('El argumento "size" es requerido');

    // PUBLIC
    this.rows = rows;
    this.size = size;

    // PRIVATE
    const cellSize = this.size / this.rows;

    // PUBLIC METHODS
    this.setTable = function() {
        let x;
        let y;
        let style;
        let sectionsList = [];

        for (let i = 1; i <= this.rows; i++) {
            y = i != 1 ? y + cellSize : 0;
            for (let j = 1; j <= this.rows; j++) {
                x = j != 1 ? x + cellSize : 0;
                style = ((i + j) % 2 != 0) ? '#000000' : '#ffffff';
                sectionsList.push({
                    style: style,
                    x: x,
                    y: y,
                    size: cellSize
                });
            }
        }

        return sectionsList;
    }
}