"use strict";

const pickUpSound = new Audio('/audio/PICKUP.wav');
const putDownSound = new Audio('/audio/PUTDOWN.wav');
const winSound = new Audio('/audio/BOXBELL.wav');
pickUpSound.volume = 0.1;
putDownSound.volume = 0.1;
winSound.volume = 0.1;


const playSound = (sound) => {
  sound.currentTime = 0; // Reset sound to start
  sound.play();
};


const score = document.getElementById('score');
let pieces; 
let activePiece;


document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('mousemove', handleMouseMove);

function handleMouseDown(e) {
    e.preventDefault(); // Drag bugfix    
    if(e.target.classList.contains('puzzle-piece')) {
        playSound(pickUpSound);
        activePiece = e.target;
        activePiece.style.pointerEvents = 'none';
    } else {
        return
    }
}

function handleMouseUp(e) {
    if (!activePiece) return
    if(e.target.classList.contains('puzzle-piece-slot')) {
        const slotPosition = e.target.getBoundingClientRect();
        const prevPositionY = parseInt(activePiece.style.top);
        const prevPositionX = parseInt(activePiece.style.left);
        activePiece.style.position = 'absolute';
        activePiece.style.top = `${slotPosition.top}px`
        activePiece.style.left = `${slotPosition.left}px`           
        activePiece.style.pointerEvents = 'auto';

        if (activePiece.dataset.order === e.target.dataset.order) {
            activePiece.dataset.placed = "true"; 
        } else {
            activePiece.dataset.placed = "false";
        }
         
        if (prevPositionY !== Math.round(slotPosition.top) || prevPositionX !== Math.round(slotPosition.left)) {
            updateScore();
        }
    } else  {
        activePiece.dataset.placed = "false";
        activePiece.style.pointerEvents = 'auto';
        activePiece.style.position = 'relative';
        activePiece.style.top = `0px`
        activePiece.style.left = `0px`
    }
    
    playSound(putDownSound);
    activePiece = null;
    if(checkWin()) {
        playSound(winSound);
        score.textContent += ` Congratulations!`
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
    }
}

function handleMouseMove(e) {
    if (!activePiece) return
    activePiece.style.position = 'absolute';
    activePiece.style.top = `${e.pageY - 42}px`;
    activePiece.style.left = `${e.pageX - 42}px`;
}

function generatePieces() {
    const puzzlePieceBin = document.querySelector('.puzzle-piece-bin');
    const cols = 5;
    const rows = 5;
    const gridSize = cols * rows;
    const puzzlePieces = [];
    for(let i = 0; i < gridSize; i++){
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.dataset.order = i+1;
        piece.style.backgroundImage = 'url(images/monroe.jpg)';
        piece.style.backgroundSize = '425px';
        const row = Math.floor(i / cols);
        const col = i % cols;
        piece.style.backgroundPosition = `-${col * (425 / cols)}px -${row * (425 / rows)}px`;
        puzzlePieces.push(piece);
    }
    puzzlePieceBin.append(...shuffleArray(puzzlePieces));

    pieces = document.querySelectorAll('.puzzle-piece');
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
generatePieces()

window.addEventListener('resize', () => {
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.style.position = 'relative';
        piece.style.top = 0;
        piece.style.left = 0;
    })
})

function updateScore() {
    score.textContent++ 
}


function checkWin() {
    return Array.from(pieces).every(piece => piece.dataset.placed === "true");
}