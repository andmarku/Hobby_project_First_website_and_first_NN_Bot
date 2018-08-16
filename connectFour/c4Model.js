function c4NewGame() {
  return {  board: createBoard(numberOfColumns = 7, numberOfRows = 6),
            nextTurn: 1,
            winner: 0,
            wonGame: false }
}

function c4StartOnlineGame() {
  let state = c4NewGame()
  c4DrawBoard(state.board)
  return state
}

function c4PlayOnlineGame(state, column) {
  c4GamePlay(state, column)
  if( state.winner != 0 && !state.wonGame){
    state.wonGame = true
    c4PostWinner(state.winner)
  }
  c4DrawBoard(state.board)
}

function c4GamePlay(state, column) {
  if (nonFullColumns(state.board).length == 0) {
    state.winner = -1
    return
  }
  let row = getEmptyRowInColumn(state.board, column)
  /* If the row isn't full, make a move */
  if(row != -1){
    state.board = updateBoard(state.board, column, row, state.nextTurn)
    lastMove = [column, row]
    state.winner = (state.winner==0 && checkForWin(state.board, state.nextTurn, numNeeded = 4))?
      state.nextTurn : state.winner
    state.nextTurn = state.nextTurn==1? 2 : 1
  }
}

function c4RandomMove(state) {
  c4PlayOnlineGame(state, randColumn(nonFullColumns(state.board)))
}
