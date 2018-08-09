let originalLog = console.log
console.log = function (obj) {
  originalLog(JSON.parse(JSON.stringify(obj)))
}


function columnClicked(boardId, x,y, numberOfColumns, numberOfRows) {
  let brickProp = getBrickProperties(boardId, numberOfColumns, numberOfRows)
  let leftEdge = document.getElementById(boardId).getBoundingClientRect().left
  let column = 0

  x -= leftEdge + brickProp.xPadding + brickProp.xPadding/2 + 2*brickProp.radius
  while (x>0 && column < (numberOfColumns - 1)){
    column += 1
    x -= brickProp.xPadding + 2*brickProp.radius
  }
  return column
}

function rowClicked(boardId, x,y, numberOfColumns, numberOfRows) {
  const brickProp = getBrickProperties(boardId, numberOfColumns, numberOfRows)
  y -= document.getElementById(boardId).getBoundingClientRect().top
  y -= brickProp.yPadding/2 + brickProp.yPadding + 2*brickProp.radius
  let row = 0
  while (y>0 && row < (numberOfRows - 1)){
    row += 1
    y -= brickProp.yPadding + 2*brickProp.radius
  }
  return row
}

function resizeCanvas(canvas) { TODO
  //Try also
  // getComputedStyle(canvas, null).width

  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
   canvas.width = width;
   canvas.height = height;
   return true;
  }

  return false;
}
