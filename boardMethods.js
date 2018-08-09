function convertBoardForAI(board, player) {
  board = board.map(vector => vector.map (element => element =  element*player))
  return board
}

function createBoard(numberOfColumns, numberOfRows) {
  let board = [], column = [], a = 0
  for (let j = 0; j < numberOfColumns; j++) {
    board.push(Array(numberOfRows).fill(0))
  }
  return board
}

function updateBoard(board, column, row, value) {
  board[column][row] = value
  return board
}

function boardToArray(board) {
    let boardAsArr = []
    board.map((arr) => {
      arr.map((element) => {
        boardAsArr.push(element)
      })
    })
    return boardAsArr
}

function arrayToBoard(board, array) {
  newBoard = createBoard(board.length, board[0].length)
	let i = 0
	for (let col = 0; col < newBoard.length; col++) {
		for (let row = 0; row < newBoard[0].length; row++) {
			newBoard = updateBoard(newBoard,col,row, value = array[i])
			i++
		}
	}
  return newBoard
}

function randColumn(availableCols) { // TODO may crash here
  if (availableCols.length == 0) {
    console.log("No legal moves left");
    return -1
  }
  return availableCols[Math.floor(Math.random()*availableCols.length)]
}

function randSlot(board) {
  let emptySlots = findEmptySlots(board)
  if (emptySlots.length == 0) {
    console.log("No legal moves left");
    return -1
  }
  return emptySlots[Math.floor(Math.random()*emptySlots.length)]
}

function nonFullColumns(board) {
  let availableCols = []
  for (let column = 0; column < board.length; column++) {
    for (let row = board[0].length-1; row > -1; row--) {
      if( board[column][row] == 0){
        availableCols.push(column)
        break
      }
    }}
    return availableCols
  }

  function findEmptySlots(board) {
    let emptySlots = []
    for (let row = 0; row < board[0].length; row++) {
      for (let column = board.length-1; column > -1; column--) {
        if( board[column][row] == 0){
          emptySlots.push({ column : column,
                            row : row })
        }
      }}
      return emptySlots
    }


function isPositionEmpty(board, column, row) {
  return board[column][row] == 0 ? true : false
}
function isBoardFull(board) {
  return findEmptySlots(board).length == 0 ? true : false
}


function isOutsideBoard(board,col, row) {
  if( col < 0 || col == board.length ||
    row < 0 || row == board[col].length){
    return true
  }
  return false
}

function checkForWin(board, turn, numNeeded) {
  for(col = 0; col < board.length; col++){
    if (hasWon(board,col, row = 0, deltaCol = 0, deltaRow = 1, numInLine = 0, turn, numNeeded)){
      return true
    }
    if (hasWon(board,col, row = 0, deltaCol = 1, deltaRow = 1, numInLine = 0, turn, numNeeded)){
      return true
    }
    if (hasWon(board,col, row = 0, deltaCol = -1, deltaRow = 1, numInLine = 0, turn, numNeeded)){
      return true
    }
  }
  for(row = 0; row < board[0].length; row++){
    if (hasWon(board,col = 0, row, deltaCol = 1, deltaRow = 0, numInLine = 0, turn, numNeeded)){
      return true
    }
    if (hasWon(board,col = 0, row, deltaCol = 1, deltaRow = 1, numInLine = 0, turn, numNeeded)){
      return true
    }
    if (hasWon(board,col = board.length-1, row, deltaCol = -1, deltaRow = 1, numInLine = 0, turn, numNeeded)){
      return true
    }
  }
  return false
}

function hasWon(board,col, row, deltaCol, deltaRow, numInLine, player, numNeeded) {
  if(isOutsideBoard(board,col, row)){
    return false
  }
  numInLine = isInLine(board,col, row, player)? numInLine + 1 : 0
  return (numInLine == numNeeded) ||
  hasWon(board,col + deltaCol, row + deltaRow, deltaCol, deltaRow, numInLine, player, numNeeded)
}

function isInLine(board,col, row, player) {
  if(player == board[col][row]){
    return true
  }
  return false
}

function getEmptyRowInColumn(board, column) {
  for (let row = board[0].length-1; row > -1; row--) {
    if( board[column][row] == 0){
      return row
    }
  }
  return -1
}
