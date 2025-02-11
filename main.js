"use strict";
let activePiece;
document.addEventListener('mousedown', (e) => {
    e.preventDefault(); // Drag bugfix    
    if(e.target.classList.contains('puzzle-piece')) {
        activePiece = e.target;
        activePiece.style.pointerEvents = 'none';
    } else {
        return
    }
})
document.addEventListener('mouseup', (e) => {
        if (!activePiece) return
        if(e.target.classList.contains('puzzle-piece-slot')) {
            const slotPosition = e.target.getBoundingClientRect();
            const prevPositionY = activePiece.style.top;
            const prevPositionX = activePiece.style.left;
            activePiece.style.position = 'absolute';
            activePiece.style.top = `${slotPosition.top}px`
            activePiece.style.left = `${slotPosition.left}px`           
            activePiece.style.pointerEvents = 'auto';  
             
            if(parseInt(prevPositionY) + parseInt(prevPositionX) != (slotPosition.top + slotPosition.left).toFixed(0)) {
                updateScore()
            }
        } else  {
            activePiece.style.pointerEvents = 'auto';
            activePiece.style.position = 'relative';
            activePiece.style.top = `0px`
            activePiece.style.left = `0px`
        }
        activePiece = null;
})
document.addEventListener('mousemove', (e) => {
    if (!activePiece) return
    activePiece.style.position = 'absolute';
    activePiece.style.top = `${e.pageY - 42}px`;
    activePiece.style.left = `${e.pageX - 42}px`;
})

function generatePieces() {
    const puzzlePieceBin = document.querySelector('.puzzle-piece-bin');
    const cols = 5;
    const rows = 5;
    const gridSize = cols * rows;
    const puzzlePieces = [];
    for(let i = 0; i < gridSize; i++){
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = 'url(images/monroe.jpg)';
        piece.style.backgroundSize = '425px';
        const row = Math.floor(i / cols);
        const col = i % cols;
        piece.style.backgroundPosition = `-${col * (425 / cols)}px -${row * (425 / rows)}px`;
        puzzlePieces.push(piece);
    }
    puzzlePieceBin.append(...shuffleArray(puzzlePieces));
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
    const score = document.getElementById('score');
    score.textContent++ 
}




























// const container = document.querySelector(".container");
// const puzzleImage = document.getElementById("puzzle-image");
// const puzzleInput = document.getElementById("puzzle-file-input");
// const puzzlePatternButton = document.getElementById("puzzle-pattern-button");

// puzzleInput.addEventListener("change", (e) => updatePuzzleImage(e));
// puzzlePatternButton.addEventListener("click", createPuzzlePattern);

// function updatePuzzleImage(event) {
//   const image = URL.createObjectURL(event.target.files[0]);
//   puzzleImage.src = image;
// }
// function createPuzzlePattern() {
//   const gridSize = 5;
//   const pieceWidth = puzzleImage.width / gridSize;
//   const pieceHeight = puzzleImage.height / gridSize;
//   const grid = document.createElement("div");
//   grid.classList.add("puzzle-grid");
//   grid.style.display = `grid`;

//   grid.style.height = `${puzzleImage.height}px`;
//   grid.style.width = `${puzzleImage.width}px`;
//   grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
//   grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;  
//   const puzzlePieces = [];
//   for (let i = 0; i < gridSize * gridSize; i++) {
//     const piece = document.createElement('div');
//     piece.classList.add('puzzle-piece');
//     piece.style.width = `${pieceWidth}px`;
//     piece.style.height = `${pieceHeight}px`;
//     piece.style.backgroundImage = `url(${puzzleImage.src})`
//     const row = Math.floor(i / gridSize);
//     const col = i % gridSize;
//     piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;

//     piece.style.outline = '2px solid black'
//     puzzlePieces.push(piece)
//   }
//   grid.append(...puzzlePieces)
//   console.log(puzzlePieces);
  
//   container.insertAdjacentElement("afterbegin", grid);
// }
