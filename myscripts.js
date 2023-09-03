// factory that returns player objects
const playerFactory = (name, marker) => {
    let words = name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    name = words.join(" ");
    return { name, marker };
}

// module that displays the gameboard and allows playrs to draw markers
const gameboard = (() => { 
    const tiles = document.querySelectorAll("div.tile");
    const markers = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
    let currentMarker = 8;
    const startButton = document.getElementById("start-button");
    const startScreen = document.getElementById("start");
    const playerInputScreen = document.getElementById("player-input-screen");
    const loadButton = document.getElementById("load-game");
    const playerOne = document.getElementById("player-one");
    const playerTwo = document.getElementById("player-two");
    const playerOneNameDisplay = document.getElementById("player-one-details");
    const playerTwoNameDisplay = document.getElementById("player-two-details");
    const playerInputForm = document.getElementById("player-input-form");
    const playAgainButton = document.getElementById("play-again-button");
    const quitButton = document.getElementById("quit-button");
    const game = document.getElementById("game");
    const playerX = playerFactory("placeholder", "X");
    const playerO = playerFactory("placeholder", "O");
    

    startButton.addEventListener('click', () => {
        startScreen.style.display = "none";
        playerInputScreen.style.display = "grid";
        
    })

    loadButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!playerInputForm.checkValidity()) {
            playerInputForm.reportValidity();
            return;
        } 
        if (playerOne.value.toLowerCase() === playerTwo.value.toLowerCase()) {
            alert("Player names must be unique. Player names are not case-sensitive.")
            return;
        }
            playerInputScreen.style.display = "none";
            game.style.display = "block";
            playerX.name = playerOne.value;
            playerO.name = playerTwo.value;
            playerOneNameDisplay.innerHTML = playerX.name + '<br />' + '<br />' + playerX.marker;
            playerTwoNameDisplay.innerHTML = playerO.name + '<br />' + '<br />' + playerO.marker;
    });

    const reset = () => {
        currentMarker = 8;
        tiles.forEach(tile => {
            tile.innerHTML = "";
        });
        gameLogic.winnerScreen.style.display = "none";
        playerOneNameDisplay.style.borderColor = "green";
        playerTwoNameDisplay.style.borderColor = "#ffd1cf";
    };

    playAgainButton.addEventListener('click', () => {
        reset();
        game.style.display = "block";
    });

    quitButton.addEventListener('click', () => {
        reset();
        startScreen.style.display = "grid";
        
    })
    

    const drawToBoard = () => {
        for (let index = 0; index < markers.length; index++) {
            tiles[index].addEventListener('click', () => {
                if (tiles[index].innerHTML === "") {
                tiles[index].innerHTML += markers[currentMarker];
                gameLogic.checkWin();
                currentMarker--;
                }
                if (currentMarker % 2 !== 0) {
                    playerOneNameDisplay.style.borderColor = "#ffd1cf";
                    playerTwoNameDisplay.style.borderColor = "green";
                } else {
                    playerOneNameDisplay.style.borderColor = "green";
                    playerTwoNameDisplay.style.borderColor = "#ffd1cf";
                }
            })
        }
    };

const getCurrentMarker = () => {
    return currentMarker;
}

    drawToBoard()
    return {
        markers,
        currentMarker,
        getCurrentMarker,
        drawToBoard,
        tiles,
        game,
        playerX,
        playerO
    };
})();

// module that checks for win condition

const gameLogic = (() => {

const winnerScreen = document.getElementById("winner-screen");
const winnerMessage = document.getElementById("winner-message");
    
const checkWin = () => {
        if (
            (gameboard.tiles[0].innerHTML === gameboard.tiles[1].innerHTML && gameboard.tiles[0].innerHTML === gameboard.tiles[2].innerHTML && gameboard.tiles[0].innerHTML != "") 
            ||
            (gameboard.tiles[3].innerHTML === gameboard.tiles[4].innerHTML && gameboard.tiles[3].innerHTML === gameboard.tiles[5].innerHTML && gameboard.tiles[3].innerHTML != "")
            ||
            (gameboard.tiles[6].innerHTML === gameboard.tiles[7].innerHTML && gameboard.tiles[6].innerHTML === gameboard.tiles[8].innerHTML && gameboard.tiles[6].innerHTML != "")
            ||
            (gameboard.tiles[0].innerHTML === gameboard.tiles[3].innerHTML && gameboard.tiles[0].innerHTML === gameboard.tiles[6].innerHTML && gameboard.tiles[0].innerHTML != "")
            ||
            (gameboard.tiles[1].innerHTML === gameboard.tiles[4].innerHTML && gameboard.tiles[1].innerHTML === gameboard.tiles[7].innerHTML && gameboard.tiles[1].innerHTML != "")
            ||
            (gameboard.tiles[2].innerHTML === gameboard.tiles[5].innerHTML && gameboard.tiles[2].innerHTML === gameboard.tiles[8].innerHTML && gameboard.tiles[2].innerHTML != "")
            ||
            (gameboard.tiles[0].innerHTML === gameboard.tiles[4].innerHTML && gameboard.tiles[0].innerHTML === gameboard.tiles[8].innerHTML && gameboard.tiles[0].innerHTML != "")
            ||
            (gameboard.tiles[2].innerHTML === gameboard.tiles[4].innerHTML && gameboard.tiles[2].innerHTML === gameboard.tiles[6].innerHTML && gameboard.tiles[2].innerHTML != "")
            ) {
            endGameWinner();
            return;
        }
        if (gameboard.getCurrentMarker() === 0) {
            endGameDraw();
            return;
        }
    };

const endGameWinner = () => {
    gameboard.game.style.display = "none";
    winnerScreen.style.display = "flex";
    if (gameboard.getCurrentMarker() % 2 === 0) {
        winnerMessage.innerHTML = "The winner is" + '<br />' + '<br />' + gameboard.playerX.name;
    } else {
       winnerMessage.innerHTML = "The winner is" + '<br />' + '<br />' + gameboard.playerO.name;
    }
    return;
};

const endGameDraw = () => {
    gameboard.game.style.display = "none";
    winnerScreen.style.display = "flex";
    winnerMessage.innerHTML = "It's a tie!"
    return;
};
    return {
        checkWin,
        winnerScreen
    };
})();

