import Game from './js/game.js'
const newGame = {};
newGame.game = new Game(60, 8, 'game');
newGame.game.start();

const playbtn = document.getElementById('play-btn');
const configbtn = document.getElementById('config-btn');
const modal = document.getElementById('modal');
const queensInput = document.getElementById('queens-number');
const fpsInput = document.getElementById('fps-number');
const message = document.getElementById('message');
const errorbtn = document.getElementById('modal-btn-error');
const successbtn = document.getElementById('modal-btn-success');

configbtn.addEventListener('click', () => {
    !modal.style.display || modal.style.display == 'none' ?
        modal.style.display = 'flex' :
        '';
});

playbtn.addEventListener('click', () => {
    let playing = newGame.game.toglePlayPause();
    if(playing) {
        playbtn.children[0].style.display = 'none';
        playbtn.children[1].style.display = 'block';
    } else {
        playbtn.children[1].style.display = 'none';
        playbtn.children[0].style.display = 'block';
    }
});

queensInput.addEventListener('input', () => {
    if(Number(queensInput.value) < 4 || Number(queensInput.value) > 1000) {
        message.innerHTML = `
            <i style="color: #f44336;">
                La cantidad de reinas debe ser un número entre 4 y 1000
            </i>
        `;
    } else {
        message.innerHTML = '';
    }
});

fpsInput.addEventListener('input', () => {
    if(Number(fpsInput.value) < 1 || Number(fpsInput.value) > 1000) {
        message.innerHTML = `
            <i style="color: #f44336;">
                La cantidad de movimientos debe ser un número entre 1 y 1000
            </i>
        `;
    } else {
        message.innerHTML = '';
    }
});

errorbtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

successbtn.addEventListener('click', () => {
    if(
        !(Number(queensInput.value) < 4 || Number(queensInput.value) > 1000) && 
        !(Number(fpsInput.value) < 1 || Number(fpsInput.value) > 1000)
    ) {
        delete newGame.game;
        newGame.game = new Game(Number(fpsInput.value), Number(queensInput.value), 'game');
        newGame.game.start();
        modal.style.display = 'none';
    } else {
        message.innerHTML = `
            <i style="color: #f44336;">
                Es necesario ingresar la cantidad de reinas y de movimientos por segundo
            </i>
        `;
    }
});
