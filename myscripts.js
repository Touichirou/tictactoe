const tiles = document.querySelectorAll("div.tile");

// module that displays the gameboard and allows playrs to draw markers
const gameboard = (() => { 
    const markers = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];
    const startButton = document.getElementById("start-button");
    const startScreen = document.getElementById("start");
    const playerInputScreen = document.getElementById("player-input-screen");
    const loadButton = document.getElementById("load-game");
    const playerOne = document.getElementById("player-one");
    const playerTwo = document.getElementById("player-two");
    const playerOneNameDisplay = document.getElementById("player-one-details");
    const playerTwoNameDisplay = document.getElementById("player-two-details");
    const playerInputForm = document.getElementById("player-input-form");
    const game = document.getElementById("game");

    startButton.addEventListener('click', () => {
        start.style.display = "none";
        playerInputScreen.style.display = "block";
        
    })

    loadButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!playerInputForm.checkValidity()) {
            alert("Please input the names of both players.")
            return;
        } 
        if (playerOne.value.toLowerCase() === playerTwo.value.toLowerCase()) {
            alert("Player names must be unique. Player names are not case-sensitive.")
            return;
        }
            playerInputScreen.style.display = "none";
            game.style.display = "block";
            const playerX = playerFactory(playerOne.value, 'X');
            const playerO = playerFactory(playerTwo.value, 'O');
            playerOneNameDisplay.innerHTML = playerX.name + '<br />' + '<br />' + playerX.marker;
            playerTwoNameDisplay.innerHTML = playerO.name + '<br />' + '<br />' + playerO.marker;
    });
    

    const drawToBoard = () => {
        for (let index = 0; index < markers.length; index++) {
            tiles[index].addEventListener('click', () => {
                if (tiles[index].innerHTML === "") {
                tiles[index].innerHTML += markers.pop();
                gameLogic.checkWin();
                }
                if (markers.length % 2 === 0) {
                    playerOneNameDisplay.style.borderColor = "red";
                    playerTwoNameDisplay.style.borderColor = "green";
                } else {
                    playerOneNameDisplay.style.borderColor = "green";
                    playerTwoNameDisplay.style.borderColor = "red";
                }
            })
        }
    };
    drawToBoard()
    return {
        markers,
        drawToBoard,
        tiles,
    };
})();

// module that checks for win condition

const gameLogic = (() => {

const checkWin = () => {
        if (tiles[0].innerHTML === tiles[1].innerHTML && tiles[0].innerHTML === tiles[2].innerHTML && tiles[0].innerHTML != "") {
            alert("The winner is " + tiles[0].innerHTML);
            return;
        }
        if (tiles[3].innerHTML === tiles[4].innerHTML && tiles[3].innerHTML === tiles[5].innerHTML && tiles[3].innerHTML != "") {
            alert("The winner is " + tiles[3].innerHTML);
            return;
        }
        if (tiles[6].innerHTML === tiles[7].innerHTML && tiles[6].innerHTML === tiles[8].innerHTML && tiles[6].innerHTML != "") {
            alert("The winner is " + tiles[6].innerHTML);
            return;
        }
        if (tiles[0].innerHTML === tiles[3].innerHTML && tiles[0].innerHTML === tiles[6].innerHTML && tiles[0].innerHTML != "") {
            alert("The winner is " + tiles[0].innerHTML);
            return;
        }
        if (tiles[1].innerHTML === tiles[4].innerHTML && tiles[1].innerHTML === tiles[7].innerHTML && tiles[1].innerHTML != "") {
            alert("The winner is " + tiles[1].innerHTML);
            return;
        }
        if (tiles[2].innerHTML === tiles[5].innerHTML && tiles[2].innerHTML === tiles[8].innerHTML && tiles[2].innerHTML != "") {
            alert("The winner is " + tiles[2].innerHTML);
            return;
        }
        if (tiles[0].innerHTML === tiles[4].innerHTML && tiles[0].innerHTML === tiles[8].innerHTML && tiles[0].innerHTML != "") {
            alert("The winner is " + tiles[0].innerHTML);
            return;
        }
        if (tiles[2].innerHTML === tiles[4].innerHTML && tiles[2].innerHTML === tiles[6].innerHTML && tiles[2].innerHTML != "") {
            alert("The winner is " + tiles[2].innerHTML);
            return;
        }
        if (gameboard.markers.length === 0) {
            alert("Draw.")
            return;
        }
    }

const endGame = () => {
    // endgame logic here
}
    return {
        checkWin
    };
})();

// factory that returns player objects
const playerFactory = (name, marker) => {
    let words = name.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    name = words.join(" ");
    return { name, marker };
}

