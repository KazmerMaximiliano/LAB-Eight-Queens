import Table from './table.js';
import Queens from './queens.js';

export default function(fps, rows, id) {
    if(!rows) throw new Error('El argumento "rows" es requerido');
    if(!fps) throw new Error('El argumento "fps" es requerido');
    if(!id) throw new Error('El argumento "id" es requerido');
    if(typeof rows != 'number') throw new Error('El argumento "rows" debe ser un número');
    if(typeof fps != 'number') throw new Error('El argumento "fps" debe ser un número');
    if(typeof id != 'string') throw new Error('El argumento "id" debe ser un número');
    if(rows <= 3) throw new Error('El argumento "row" debe ser mayor que 3');
    if(fps < 1 || fps > 1000) throw new Error('El argumento "fps" debe ser un número entre 1 y 1000');

    this.fps = fps;
    this.rows = rows;
    this.id = id;

    var playing = false;

    const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,  
        document.documentElement.clientHeight, 
        document.documentElement.scrollHeight, 
        document.documentElement.offsetHeight 
    );
    const size = documentHeight - 32;
    const sectionSize = size / this.rows;
    const gameElement = document.getElementById(this.id);
    const canvas = document.createElement("canvas");
    canvas.width = size * 0.99;
    canvas.height = size * 0.99;
    const ctx = canvas.getContext("2d");
    const newTable = new Table(this.rows, size);
    const sections = newTable.setTable();
    const newQueens = new Queens(this.rows);
    
    this.start = function() {
        gameElement.innerHTML = '';
        gameElement.appendChild(canvas);
        drawTable();
        setInterval(function(){
            update();
        }, 1000/this.fps);
    }

    this.play = function() {
        
        setInterval(function(){
            update();
        }, 1000/this.fps);
    }

    const update = function() {
        if(playing) {
            reseatCanvas();
            drawTable();
            drawQueens();
        }
    }

    const reseatCanvas = function() {
        canvas.width = size * 0.99;
        canvas.height = size * 0.99;
    }

    const drawTable = function() {
        for (let i = 0; i < sections.length; i++) {
            ctx.fillStyle = sections[i].style;
            ctx.fillRect(sections[i].x, sections[i].y, sections[i].size, sections[i].size);
        }
    }

    const drawQueens = function() {
        let queens = newQueens.setQueens();
        
        if(queens.blueQueens.length === rows) {
            toglePlay(rows);
            console.log('completado en ' + newQueens.getSteps() + ' pasos');
        }

        if(queens.redQueen) {
            let posx = (queens.redQueen.x - 1) * sectionSize;
            let posy = (queens.redQueen.y - 1) * sectionSize;

            let img = new Image();
            img.onload = function() {
                ctx.drawImage(img, posx, posy, sectionSize, sectionSize);
            }
            img.src = '../img/red_queen.png';
        }

        if(queens.blueQueens.length > 0) {
            for (let i = 0; i < queens.blueQueens.length; i++) {
                let queen = queens.blueQueens[i];
                let posx = (queen.x - 1) * sectionSize;
                let posy = (queen.y - 1) * sectionSize;
    
                let img = new Image();
                img.onload = function() {
                    ctx.drawImage(img, posx, posy, sectionSize, sectionSize);
                }
                img.src = '../img/blue_queen.png';
            }
        }
    }

    this.toglePlayPause = function() {
        toglePlay(this.rows);
        return playing;
    }

    const toglePlay =  function(rows) {
        let queens = newQueens.setQueens();
        if(queens.blueQueens.length === rows) {
            playing = false;
        } else {
            playing = !playing;
        }
    }
}