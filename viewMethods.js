
function drawBoard(board, canvasName, canvasColor, brickColoring) {
  let canvas = document.getElementById(canvasName)
  canvas.setAttribute('width', getComputedStyle(canvas, null).width);
  canvas.setAttribute('height', getComputedStyle(canvas, null).height);
  paintCanvas(canvas, canvasColor)
  let brickProp = getBrickProperties(canvasName, board.length, board[0].length)
  drawBricks(canvas, brickProp, board, brickColoring)
}

function paintCanvas(canvas, color) {
  let context = canvas.getContext("2d")
  context.fillStyle = color
  context.rect(leftEdge = 0,topEdge=0,canvas.width,canvas.height)
  context.fill()
}

function paintNetwork(canvasName, canvasColor, network) {
  let canvas = document.getElementById(canvasName)
  paintCanvas(canvas, 'rgb(255, 255, 255)'); // white
  drawNode(canvas, getNetworkProperties(canvasName, network),
    networkIntoBoard(network), canvasColor)
}

function drawNode(canvas, nodeProp, board, canvasColor) {
  let yPos, xPos = nodeProp.radius + nodeProp.xPadding // x-pos of 1 node
  board.map(column => {
    // y-pos of 1 node in each layer (differs for each layer)
    yPos = nodeProp.radius + (canvas.height -  column.length*(nodeProp.radius*2) -
      ( column.length-1)*nodeProp.yBetweenNodes) / 2

    column.map(element =>{
      drawCircle(canvas, canvasColor, nodeProp.radius, xPos, yPos)
      // Space between the centers of two nodes
      yPos += 2*nodeProp.radius + nodeProp.yBetweenNodes
    })
    // Space between layers
    xPos += 2*nodeProp.radius + nodeProp.xPadding
  })
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
  let context = canvas.getContext("2d")
  context.fillStyle = color
  context.beginPath()
  context.arc(xPos, yPos, radius, 0, Math.PI*2)
  context.fill()
}

function getBrickProperties(boardId, numberOfColumns, numberOfRows) {
  let canvas = document.getElementById(boardId),
    diameter = ( canvas.height / (numberOfRows + 1) > canvas.width / (numberOfColumns + 1))?
        canvas.width / (numberOfColumns + 1) : canvas.height / (numberOfRows + 1),
    xPadding = (canvas.width - numberOfColumns * diameter) / (numberOfColumns + 1),
    yPadding = (canvas.height - numberOfRows * diameter) / (numberOfRows + 1)
  return {radius : diameter/2, xPadding : xPadding, yPadding : yPadding }
}

function postUnder(elementName, text) {
  let par = document.createElement("p")
  par.innerHTML = text;
  document.getElementById(elementName).appendChild(par);
}

function postReplace(elementName, text) {
  document.getElementById(elementName).innerHTML = text;
}

function hideElement(elementName) {
  document.getElementById(elementName).style.display = "none";
}

function showElement(elementName) {
  document.getElementById(elementName).style.display = "block";
}
