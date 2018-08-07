var r3BoardState, r3PlayerTurn, r3Winner, r3LastMove, r3AlreadyWon, gameLog

function r3NewGame() {
  var newBoard = createBoard(numberOfColumns = 3, numberOfRows = 3)
  setR3BoardState(newBoard)
  r3PlayerTurn = 1
  r3Winner = 0
  r3AlreadyWon = false
  gameLog = []
}

function r3StartOnlineGame(boardId) {
  r3NewGame()
  r3DrawBoard(getR3BoardState(),boardId)
}

function r3OnlineGame(slot,boardId) {
  /* If the slot is empty, make a move */
  if(isPositionEmpty(getR3BoardState(), slot.column, slot.row)){
    r3Game(slot)
    if( getR3Winner() != 0 && !r3AlreadyWon){
      r3AlreadyWon = true
      r3PostWinner(r3Winner)
    }
  }
  r3DrawBoard(getR3BoardState(), boardId)
}

function r3Game(slot) {
  setR3LastMove(slot)
  setR3BoardState( updateBoard( getR3BoardState(), slot.column, slot.row, r3PlayerTurn))
  updateGameLog()

  if (r3Winner == 0 &&
    checkForWin(getR3BoardState(), r3PlayerTurn, numNeeded = 3)) {
    r3Winner = r3PlayerTurn
  }else if ( r3Winner == 0 && isBoardFull(getR3BoardState())) {
    r3Winner = 2
  }

  r3PlayerTurn = (r3PlayerTurn==1)? -1 : 1
  return r3Winner
}

function r3RandomMove() { // // TODO:  ugly solution
  if (isBoardFull(getR3BoardState())) {
    return
  }
  r3OnlineGame(randSlot(getR3BoardState()))
}

function r3MakeAiMove() {
  if (isBoardFull(getR3BoardState())) {
    return
  }
   r3OnlineGame(r3CreateALastMove(getR3BoardState(),getr3PlayerTurn()))
}

function setR3BoardState(newBoard) {
  r3BoardState = newBoard
}

function setR3LastMove(slot) {
  r3LastMove = slot
}
function getR3BoardState() {
  return r3BoardState
}

function getR3Winner() {
  return r3Winner
}

function getR3LastMove() {
  return r3LastMove
}

function getr3PlayerTurn() {
  return r3PlayerTurn
}
function updateGameLog() { // TODO refactor in
  var currentTurn = {
    player: getr3PlayerTurn(),
    column: getR3LastMove().column,
    row: getR3LastMove().row
  }
  gameLog.push(currentTurn)
}

function getGameLog() {
  return gameLog
}
