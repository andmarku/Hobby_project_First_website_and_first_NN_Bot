
function r3PostWinner(winner) {
  winner = winner == -1? 0 : winner
  var players = ["two", "one"]
  var text =  winner == 2 ? "Game drawn" : "Player " + players[winner] + " has won!"
  postReplace(element = "r3Res", text)
}

function r3DrawBoard(board, boardId) {
  var someRed = "rgb(102,0,0)"

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

  drawBoard(board, canvasName = boardId, canvasColor = someRed, brickColoring)
}
