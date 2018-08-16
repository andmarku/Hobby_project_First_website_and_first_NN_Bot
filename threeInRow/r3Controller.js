function r3Train(element, network, newIterations, itrTrained, traningFunction) {
  itrTrained += newIterations
  traningFunction(network, newIterations)
  postReplace(element,"Trained for " + itrTrained + " iterations in total")
  return itrTrained
}

function r3ColumnClicked(state, boardId, canvasColor, postWinnerElement, x, y) {
  let board = state.board,
      slot = {  column: columnClicked(boardId,x,y, board.length, board[0].length),
                row: rowClicked(boardId,x,y, board.length, board[0].length) }
  r3OnlineGame(state, slot, boardId, postWinnerElement, canvasColor)
}

function r3ShowBoard(state, boardId, canvasColor, network, buttonToShowId ) {
  showElement(buttonToShowId)
  r3paintBoard(state.board, boardId, canvasColor)
  return whatIsShown = "board"
}

function r3ShowNet(state, boardId, canvasColor, network, buttonToHideId ) {
  hideElement(buttonToHideId)
  paintNetwork(boardId, canvasColor, network)
  return whatIsShown = "net"
}

function r3ShowVision(state, boardId, canvasColor, network, buttonToHideId) {
    hideElement(buttonToHideId)
    r3PaintNetworkVision(boardId, canvasColor, network)
    return whatIsShown = "vision"
}
