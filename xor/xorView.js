
function postResult(isCorrect) {
  let text = isCorrect? "The board fullfills 'either or'." :
   "The board does not fullfill 'either or'."
  postReplace(element = "xorPost", text)
}

function postAiResult(isCorrect) {
  let text = isCorrect? "The AI thinks that the board fullfills 'either or'." :
   "The AI thinks that the board does not fullfill 'either or'."
  postReplace(element = "xorPost", text)
}

function xorpaintBoard(board, canvasName, canvasColor) {
  // Define the color of the bricks for this game
  function brickColoring(element) {
    if( element == 0)
      color = "white"
    else
      color = "rgb(273,200,71)" // yellowish
    return color
  }
  paintBoard(board, canvasName, canvasColor, brickColoring)
}

function xorShowNet(canvasName, canvasColor, network) {
  paintNetwork(canvasName, canvasColor, network)
}
