function r3Train(element, network, newIterations, selfItrTrained) {
  selfItrTrained += newIterations
  r3SelfPlay(network, newIterations)
  postReplace(element,"Trained for " + selfItrTrained + " iterations in total")
  return selfItrTrained
}

function r3ColumnClicked(isBoardShown, state, boardId, canvasColor, postWinnerElement, x, y) {
if(isBoardShown){
  let board = state.board
  let slot = {  column: columnClicked(boardId,x,y, board.length, board[0].length),
                row: rowClicked(boardId,x,y, board.length, board[0].length) }
  r3OnlineGame(state, slot, boardId, postWinnerElement, canvasColor)
}}

function r3ShowNet(isBoardShown, state, boardId, canvasColor, network) {
isBoardShown = isBoardShown? false:true
if (isBoardShown) {
  r3DrawBoard(state.board, boardId, canvasColor)
}else {
  paintNetwork(boardId, canvasColor, network)
}
return isBoardShown
}
