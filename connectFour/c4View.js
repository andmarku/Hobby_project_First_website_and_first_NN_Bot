
function c4PostWinner(winner) {
  let text =  winner == -1 ? "Game drawn" : "Player " + winner + " has won"
  postUnder(element =  "c4Post", text)
}

function c4DrawBoard(board) {
  let someBlue = "rgb(47,54,73)"

  // Define the color of the bricks for this game
  function brickColoring(element) {
    if( element == 0) {
      color = "white"
    } else if (element==1) {
      // yellow
      color = "rgb(244,199,62)"
    } else {
      // red
      color = "rgb(242,122,64)"
    }
    return color
  }

  drawBoard(board, canvasName = 'c4Board', canvasColor = someBlue, brickColoring)
}
