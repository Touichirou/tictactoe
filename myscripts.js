const tiles = document.querySelectorAll("div.tile");

// module that displays the gameboard 
const gameboard = (() => { 
    const markers = ["x", "o", "x", "o", "x", "o", "x", "o", "x"];

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
        }
    }
    return {
        checkWin
    };
})();

// factory that returns player objects
const playerFactory = (marker) => {
    return {marker};

}