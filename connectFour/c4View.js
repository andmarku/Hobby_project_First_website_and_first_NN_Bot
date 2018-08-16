
function c4PostWinner(winner, element) {
  let text =  winner == -1 ? "Game drawn" : "Player " + winner + " has won"
  postUnder(element, text)
}

function c4paintBoard(board, canvasName) {
  // Define the color of the bricks for this game
  function brickColoring(element,  canvasName) {
    if( element == 0)
      color = "white"
    else if (element==1)
      color = "rgb(244,199,62)" // yellow
    else
      color = "rgb(242,122,64)" // red
    return color
  }
  paintBoard(board, canvasName, canvasColor = "rgb(47,54,73)" /* blue */, brickColoring)
}
