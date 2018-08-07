var xorBoard

function xorNewGame() {
  xorBoard = createBoard(numberOfColumns = 2, numberOfRows = 1)
  winner = 0
  xorDrawBoard(xorBoard)
}

function xorPlayOnlineGame(column) { //TODO
  xorChangeBrick(column)
  xorDrawBoard(xorBoard)
}

function xorChangeBrick(column) {
  if(xorBoard[column][0] == 0){
    xorBoard = updateBoard(xorBoard, column, row = 0, value = 1)
  } else {
    xorBoard = updateBoard(xorBoard, column, row = 0, value = 0)
  }
}

function isXor(xorBoard) {
  isNot = xorBoard[0][0] == 0 && xorBoard[1][0] == 0
  isBoth = xorBoard[0][0] == 1 && xorBoard[1][0] == 1
  if( isNot || isBoth){
    return 1
  }
  return 0
}


function getXorBoard() { // TODO replace all accesses to the variable and comment which "template" it is - factory?
  return xorBoard
}
