// makes the log print out the obj as it was at the state when log was called
let originalLog = console.log
console.log = function (obj) {
  originalLog(JSON.parse(JSON.stringify(obj)))
}

function columnClicked(boardId, x,y, numberOfColumns, numberOfRows) {
  let brickProp = getBrickProperties(boardId, numberOfColumns, numberOfRows),
      leftEdge = document.getElementById(boardId).getBoundingClientRect().left,
      column = 0
  x -= leftEdge + brickProp.xPadding + brickProp.xPadding/2 + 2*brickProp.radius
  while (x>0 && column < (numberOfColumns - 1)){
    column += 1
    x -= brickProp.xPadding + 2*brickProp.radius
  }
  return column
}

function rowClicked(boardId, x,y, numberOfColumns, numberOfRows) {
  let brickProp = getBrickProperties(boardId, numberOfColumns, numberOfRows),
      row = 0
  y -= document.getElementById(boardId).getBoundingClientRect().top
  y -= brickProp.yPadding/2 + brickProp.yPadding + 2*brickProp.radius
  while (y>0 && row < (numberOfRows - 1)){
    row += 1
    y -= brickProp.yPadding + 2*brickProp.radius
  }
  return row
}
