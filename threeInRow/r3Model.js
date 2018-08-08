function r3NewGame() {
  return {
             alreadyWon : false,
             winner : 0,
             board : createBoard(numberOfColumns = 3, numberOfRows = 3),
             nextTurn : 1, // current player
             lastMove : null,
             log : []
           }
}

function r3StartOnlineGame(boardId, canvasColor) {
  let state = r3NewGame()
  r3DrawBoard(state.board,boardId, canvasColor)
  return state
}

function r3OnlineGame(state, slot, boardId, postWinnerElement, canvasColor) {
  /* If the slot is empty, make a move */
  if(isPositionEmpty(state.board, slot.column, slot.row)){
    r3Game(state, slot)
    if( state.winner != 0 && !state.alreadyWon){
      state.alreadyWon = true
      r3PostWinner(postWinnerElement, state.winner)
    }
  }
  r3DrawBoard(state.board, boardId, canvasColor)
}

function r3Game(state, slot) {
  state.lastMove = slot
  state.board = updateBoard( state.board, slot.column, slot.row, state.nextTurn)
  state.log.push({
    player: state.nextTurn,
    column: state.lastMove.column,
    row: state.lastMove.row
  })

  if (state.winner == 0 &&
    checkForWin(state.board, state.nextTurn, numNeeded = 3)) {
    state.winner = state.nextTurn
  }else if ( state.winner == 0 && isBoardFull(state.board)) {
    state.winner = 2
  }

  state.nextTurn = (state.nextTurn==1)? -1 : 1
  return state.winner
}

function r3RandomMove(state, boardId, postWinnerElement, canvasColor) { // TODO:  ugly solution
  if (isBoardFull(state.board)) { return }
  r3OnlineGame(state, randSlot(state.board),boardId, postWinnerElement, canvasColor)
}

function r3MakeAiMove(state, boardId, postWinnerElement, canvasColor) {
  if (isBoardFull(state.board)) { return }
  r3OnlineGame(state, r3AiMove(state),boardId, postWinnerElement, canvasColor)
}
