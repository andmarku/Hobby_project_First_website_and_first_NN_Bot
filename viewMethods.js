
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
  let canvas = document.getElementById(canvasName),
      netAsBoard = getCanvasNodeProp(canvas, getNetworkProperties(canvasName, network),
                      networkIntoBoard(network), canvasColor)
  paintCanvas(canvas, 'rgb(255, 255, 255)' /* white*/);
  drawWeights(canvas, netAsBoard)
  drawNode(canvas, getNetworkProperties(canvasName, network),
    netAsBoard, canvasColor)
}

function paintNetworkVision(canvasName, canvasColor, network, funColoring) {
  let canvas = document.getElementById(canvasName),
      layOutOfNeuronOnCanvas = layoutOfNeuron(network),
      boards = vision(network)
  paintCanvas(canvas, canvasColor);
  drawGrid(canvas, strokeColor = 'rgb(255, 255, 255)' /* white */, columns
      = layOutOfNeuronOnCanvas.columns, rows =  layOutOfNeuronOnCanvas.rows)
  drawVision(canvas, boards, funColoring)
}

function drawWeights(canvas, netAsBoard) {
  let red = "rgb(144,0,0)", blue = "rbg(0,0,0)",
      weight, outputNode, connections
  for (var i = 0; i < netAsBoard.length -1; i++) {
    netAsBoard[i].map(inputNode =>{
      connections = Object.values(inputNode.node.connections.projected)
        for (var j = 0; j < netAsBoard[i+1].length; j++) {
          outputNode = netAsBoard[i+1][j]
          // making sure that the connection can be seen
          weight = Math.abs(connections[j].weight) < 0.3? 0.3 : connections[j].weight
          if (weight > 0) {
            drawLine(canvas, strokeColor = blue, lineWidth = weight, inputNode, outputNode)
          }else {
            drawLine(canvas, strokeColor = red, lineWidth = weight, inputNode, outputNode)
          }
        }
    })
  }
}

function drawVision(canvas, boards, funColoring) {
  let height, width, board, brickProp, index = 0
  for (var i = 1; i <= rows; i++) {
    height = i * canvas.height / rows
    for (var j = 1; j <= columns; j++) {
      width = j * canvas.width / columns
      start = { xPos: (j-1)*canvas.width / columns,
                yPos: (i-1)*canvas.height / rows}
      board = boards[index++]
      brickProp = calcBrickProperties(board.length, board[0].length, canvas.width
        / columns, canvas.height / rows) //TODO calc to many times
      drawBricksGeneral(canvas, brickProp, board, funColoring, start)
    }
  }
}

function drawBricks(canvas, brickProp, board, funColoring) { // Cannot i use something like startPos = startPos || {0, 0}?
  let startPos = {xPos: 0,
                  yPos: 0}
  drawBricksGeneral(canvas, brickProp, board, funColoring, startPos)
}

function drawBricksGeneral(canvas, brickProp, board, funColoring, startPos) { //TODO refactor?
  /* Defining the center of the upper left brick */
  let xPos = startPos.xPos + brickProp.radius + brickProp.xPadding,
  yPos = startPos.yPos + brickProp.radius + brickProp.yPadding
  board.map(column => {
    column.map(element =>{
      drawCircle(canvas, funColoring(element), brickProp.radius, xPos, yPos)
      yPos += 2*brickProp.radius + brickProp.yPadding
    })
    xPos += 2*brickProp.radius + brickProp.xPadding
    yPos = startPos.yPos + brickProp.radius + brickProp.yPadding
  })
}

function drawGrid(canvas, strokeColor, columns, rows) {
  let height = 0, width = 0, start, end
  // Need one less line than rows, also need to start at one in order to divide
  for (var i = 1; i < rows; i++) {
    height = i * canvas.height / rows
    start = { xPos: 0,
              yPos: height}
    end = { xPos: canvas.width,
            yPos: height}
    drawLine(canvas, strokeColor, lineWidth = 1, start, end)// TODO magic numbers
  }
  for (var j = 1; j < columns; j++) {
    width = j * canvas.width / columns
    start = { xPos: width,
              yPos: 0}
    end = { xPos: width,
            yPos: canvas.height}
    drawLine(canvas, strokeColor, lineWidth = 1, start, end)// TODO magic numbers
  }
}

function drawLine(canvas, strokeColor, lineWidth, start, end) {
  let context = canvas.getContext("2d")
  context.strokeStyle = strokeColor
  context.lineWidth = lineWidth
  context.beginPath();
  context.moveTo(start.xPos, start.yPos);
  context.lineTo(end.xPos, end.yPos);
  context.stroke();
}

function drawNode(canvas, nodeProp, netAsBoard, canvasColor) {
  netAsBoard.map(column => {
    column.map(element =>{
      drawCircle(canvas, canvasColor, nodeProp.radius, element.xPos, element.yPos)
    })
  })
}

function getCanvasNodeProp(canvas, nodeProp, board, canvasColor) {
  let yPos, xPos = nodeProp.radius + nodeProp.xPadding, // x-pos of 1 node
      newBoard = [], newColumn, newNode
  board.map(column => {
    newColumn = []
    // y-pos of 1 node in each layer (differs for each layer)
    yPos = nodeProp.radius + (canvas.height -  column.length*(nodeProp.radius*2) -
      ( column.length-1)*nodeProp.yBetweenNodes) / 2

    column.map(element =>{
      newColumn.push({node: element,
                      xPos: xPos,
                      yPos: yPos})
      // Space between the centers of two nodes
      yPos += 2*nodeProp.radius + nodeProp.yBetweenNodes
    })
    // Space between layers
    xPos += 2*nodeProp.radius + nodeProp.xPadding
    newBoard.push(newColumn)
  })
  return newBoard
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
      height = canvas.height,
      width = canvas.width
  return calcBrickProperties(numberOfColumns, numberOfRows, width, height)
}

function calcBrickProperties(numberOfColumns, numberOfRows, width, height) { // TODO Duplication
  let diameter = ( height / (numberOfRows + 1) > width / (numberOfColumns + 1))?
        width / (numberOfColumns + 1) : height / (numberOfRows + 1),
    xPadding = (width - numberOfColumns * diameter) / (numberOfColumns + 1),
    yPadding = (height - numberOfRows * diameter) / (numberOfRows + 1)
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
