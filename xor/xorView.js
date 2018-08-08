
function postResult(isCorrect) {
  var text = isCorrect? "The board fullfills 'either or'." :
   "The board does not fullfill 'either or'."
  postReplace(element = "xorPost", text)
}

function postAiResult(isCorrect) {
  var text = isCorrect? "The AI thinks that the board fullfills 'either or'." :
   "The AI thinks that the board does not fullfill 'either or'."
  postReplace(element = "xorPost", text)
}

function xorDrawBoard(board, canvasColor) {
  // Define the color of the bricks for this game
  function brickColoring(element) {
    if( element == 0) {
      color = "white"
    } else {
      // yellowish
      color = "rgb(273,200,71)"
    }
    return color
  }
  drawBoard(board, canvasName = 'xorBoard', canvasColor, brickColoring)
}
