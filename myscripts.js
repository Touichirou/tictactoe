const tiles = document.querySelectorAll("div.tile");
const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start");
const playerInputScreen = document.getElementById("player-input-screen");
const loadButton = document.getElementById("load-game");
const playerOne = document.getElementById("player-one");
const playerTwo = document.getElementById("player-two");
const playerInputForm = document.getElementById("player-input-form");
const game = document.getElementById("game");

// module that displays the gameboard and allows playrs to draw markers
const gameboard = (() => { 
    const markers = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

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
        
    });
    

    const drawToBoard = () => {
        for (let index = 0; index < markers.length; index++) {
            tiles[index].addEventListener('click', () => {
                if (tiles[index].innerHTML === "") {
                tiles[index].innerHTML += markers.pop();
                gameLogic.checkWin();
                }
            })
        }
    };
    drawToBoard()
    return {
        markers,
        drawToBoard,
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
    return {
        checkWin
    };
})();

// factory that returns player objects
const playerFactory = (name, marker) => {
    return { name, marker };
}

const horatio = playerFactory('horatio', 'x');
console.log(horatio.name);
console.log(horatio.marker);