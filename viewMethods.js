
function drawBoard(board, canvasName, canvasColor, brickColoring) {
  let canvas = document.getElementById(canvasName)
  const brickProp = getBrickProperties(canvasName, board.length, board[0].length)
  paintCanvas(canvas, canvasColor)
  drawBricks(canvas, brickProp, board, brickColoring)
}

function paintCanvas(canvas, color) {
  canvas.setAttribute('width', getComputedStyle(canvas, null).width);
  canvas.setAttribute('height', getComputedStyle(canvas, null).height);
  let width = canvas.width, height = canvas.height
  let context = canvas.getContext("2d")
  context.fillStyle = color
  context.rect(leftEdge = 0,topEdge=0,width,height)
  context.fill()
}

function paintNetwork(board, canvasName, canvasColor, brickColoring, network) {
  let canvas = document.getElementById(canvasName)

  // Calculate the number of layers
  let numLayers = 2 + network.layers.hidden.length

  // Check maximum nr of nodes in numLayers
  let maxInLayer = network.layers.input.size < network.layers.output.size?
  network.layers.output.size: network.layers.input.size
  for (var i = 0; i < network.layers.hidden.length; i++) {
    maxInLayer = network.layers.hidden[i].size > maxInLayer?
    network.layers.hidden[i].size : maxInLayer
  }
  let nodeProp = getNetworkProperties(canvasName, maxInLayer, numLayers)

  // Create a board to send to draw
  input = [], hidden = [], output = []
  network.neurons().map( node => {
    if (node.layer == "input") {
      input.push(1)
    }else if (node.layer == 0) {
      hidden.push(1)
    } else {
      output.push(1)
    }
  })
  board = [input, hidden, output]

  paintCanvas(canvas, 'rgb(255, 255, 255)'); // white
  drawNode(canvas, nodeProp, board, brickColoring)
}


function drawNode(canvas, nodeProp, board, funColoring) {
  /* Defining the center of the upper left brick */
  let yPos, xPos = nodeProp.radius + nodeProp.xPadding
  /* Painting each brick */
  board.map(column => {
    yPos = nodeProp.radius + getyPaddingOnEachSide(canvas, nodeProp, column.length)
    column.map(element =>{
      drawCircle(canvas, funColoring(element), nodeProp.radius, xPos, yPos)
      yPos += 2*nodeProp.radius + nodeProp.yBetweenNodes
    })
    xPos += 2*nodeProp.radius + nodeProp.xPadding
  })
}

function getNetworkProperties(canvasName, maxInLayer, numLayers) {
  let brickProp = getBrickProperties(canvasName, numLayers, maxInLayer)
  let nodeProp = {
    radius : brickProp.radius,
    xPadding : brickProp.xPadding,
    yBetweenNodes : brickProp.yPadding
  }
  return nodeProp
}

function getyPaddingOnEachSide(canvas, nodeProp, numInLayer) {
  let yPaddingOnEachSide = (canvas.height - numInLayer*(nodeProp.radius*2) -
    (numInLayer-1)*nodeProp.yBetweenNodes) / 2
  return yPaddingOnEachSide
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

function postUnder(elementName, text) {
  var element = document.getElementById(elementName);
  var par = document.createElement("p")
  par.innerHTML = text;
  element.appendChild(par);
}

function postReplace(elementName, text) {
  var element = document.getElementById(elementName);
  element.innerHTML = text;
}
