let boardState, playerTurn, winner, lastMove, wonGame

function c4NewGame() {
  let newBoardState = createBoard(numberOfColumns = 7, numberOfRows = 6)
  setC4BoardState(newBoardState)
  playerTurn = 1
  winner = 0
  wonGame = false
}

function startOnlineGame() { // TODO - can send method names also!
  c4NewGame()
  c4DrawBoard(getC4BoardState())
}

function playOnlineGame(column) {
  let winner = gamePlay(column)
  if( winner != 0 && !wonGame){
    wonGame = true
    postWinner(winner)
  }
  c4DrawBoard(getC4BoardState())
}

function gamePlay(column) {
  if (nonFullColumns(getC4BoardState()).length == 0) {
    winner = -1
    return winner
  }

  let row = getEmptyRowInColumn(getC4BoardState(), column)

  /* If the row isn't full, make a move */
  if(row != -1){
    let newBoardState = updateBoard(getC4BoardState(), column, row, playerTurn)
    setC4BoardState(newBoardState)
    lastMove = [column, row]
    winner = (winner==0 && checkForWin(getC4BoardState(), playerTurn, numNeeded = 4))?
      playerTurn : winner
    playerTurn = (playerTurn==1)? 2 : 1
  }

  return winner
}

function makeRandomAiMove() {
  playOnlineGame(randomColumn())
}

function randomColumn() {
  return randColumn(nonFullColumns(getC4BoardState()))
}


function makeLastMoveAiMove() {
  playOnlineGame(generateLastMoveAiMove(getC4BoardState()))
}

function setC4BoardState(newBoardState) {
  boardState = newBoardState
}

function getC4BoardState() {
  return boardState
}

function getWinner() {
  return winner
}

function getLastMove() {
  return lastMove
}
