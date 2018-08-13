
function r3PostWinner(element, winner) {
  winner = winner == -1? 0 : winner
  let players = ["two", "one"]
  let text =  winner == 2 ? "Game drawn" : "Player " + players[winner] + " has won!"
  postReplace(element, text)
}

function r3DrawBoard(board, boardId, canvasColor) {
  // Define the color of the bricks for this game
  drawBoard(board, boardId, canvasColor, brickColoring)
}

function postResAiTest(element, iterations, stats) {
  postReplace(element,"The AI won " + stats.won + ", drew " + stats.drawed +
    " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
}

function r3PaintNetworkVision(boardId, canvasColor, network) {
  paintNetworkVision(boardId, canvasColor, network,brickColoring)
}

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
