
function r3PostWinner(element, winner) {
  winner = winner == -1? 0 : winner
  let players = ["two", "one"],
      text =  winner == 2 ? "Game drawn" : "Player " + players[winner] + " has won!"
  postReplace(element, text)
}

function r3paintBoard(board, boardId, canvasColor) {
  paintBoard(board, boardId, canvasColor, brickColoring)
}

function postResAiTest(element, iterations, stats) {
  postReplace(element,"The AI won " + stats.won + ", drew " + stats.drawed +
    " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
}

function r3PaintNetworkVision(boardId, canvasColor, network) {
  paintNetworkVision(boardId, canvasColor, network, brickColoring)
}

// Defines the color of the bricks for this game
function brickColoring(element) {
  let seeThrough = Math.abs(element)
  if( element == 0)
    color = "white"
  else if (element > 0)
    color = "rgba(244,199,62," + seeThrough + ")" // yellow
  else
    color = "rgba(242,122,64," + seeThrough + ")" // red
  return color
}
