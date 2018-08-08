
function drawBoard(board, canvasName, canvasColor, brickColoring) {
  let canvas = document.getElementById(canvasName)
  const brickProp = getBrickProperties(canvasName, board.length, board[0].length) // TODO: skicka med?

  paintCanvas(canvas, canvasColor)
  drawBricks(canvas, brickProp, board, brickColoring)
}

function paintCanvas(canvas, color) {
  canvas.setAttribute('width', getComputedStyle(canvas, null).width); // TODO not best solution?
  canvas.setAttribute('height', getComputedStyle(canvas, null).height);
  let width = canvas.width, height = canvas.height
  let context = canvas.getContext("2d")
  context.fillStyle = color
  context.rect(leftEdge = 0,topEdge=0,width,height)
  context.fill()
}


function postReplace(elementName, text) {
  var element = document.getElementById(elementName);
  element.innerHTML = text;
}

function postUnder(elementName, text) {
  var element = document.getElementById(elementName);
  var par = document.createElement("p")
  par.innerHTML = text;
  element.appendChild(par);
}

function drawBricks(canvas, brickProp, board, funColoring) {
  /* Defining the center of the upper left brick */
  let xPos = brickProp.radius + brickProp.xPadding
  let yPos = brickProp.radius + brickProp.yPadding
  /* Painting each brick */
  board.map(column => {
    column.map(element =>{
      drawCircle(canvas, funColoring(element), brickProp.radius, xPos, yPos)
      yPos += 2*brickProp.radius + brickProp.yPadding
    })
    xPos += 2*brickProp.radius + brickProp.xPadding
    yPos = brickProp.radius + brickProp.yPadding
  })
}

function drawCircle(canvas, color, radius, xPos, yPos) {
  var context = canvas.getContext("2d")
  context.fillStyle = color
  context.beginPath()
  context.arc(xPos, yPos, radius, 0, Math.PI*2)
  context.fill()
}

function getBrickProperties(boardId, numberOfColumns, numberOfRows) { // TODO duplication of paint canvas
  var canvas  = document.getElementById(boardId)
  var xPadding, yPadding, diameter
  canvas.setAttribute('width', getComputedStyle(canvas, null).width);
  canvas.setAttribute('height', getComputedStyle(canvas, null).height);
  var width = canvas.width
  var height = canvas.height

  diameter = ( height / (numberOfRows + 1) > width / (numberOfColumns + 1))?
  width / (numberOfColumns + 1) : height / (numberOfRows + 1)
  xPadding = (width - numberOfColumns * diameter) / (numberOfColumns + 1)
  yPadding = (height - numberOfRows * diameter) / (numberOfRows + 1)

  return {radius : diameter/2, xPadding : xPadding, yPadding : yPadding }
}
