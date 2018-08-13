function r3Train(element, network, newIterations, itrTrained, traningFunction) {
  itrTrained += newIterations
  traningFunction(network, newIterations)
  postReplace(element,"Trained for " + itrTrained + " iterations in total")
  return itrTrained
}

function r3ColumnClicked(isBoardShown, state, boardId, canvasColor, postWinnerElement, x, y) {
  if(isBoardShown){
    let board = state.board
    let slot = {  column: columnClicked(boardId,x,y, board.length, board[0].length),
                  row: rowClicked(boardId,x,y, board.length, board[0].length) }
    r3OnlineGame(state, slot, boardId, postWinnerElement, canvasColor)
}}

function r3ShowBoard(isBoardShown, state, boardId, canvasColor, network, buttonToShowId ) {
  whatIsShown = "board"
  showElement(buttonToShowId)
  r3DrawBoard(state.board, boardId, canvasColor)
  return whatIsShown
}

function r3ShowNet(isBoardShown, state, boardId, canvasColor, network, buttonToHideId ) {
  whatIsShown = "net"
  hideElement(buttonToHideId)
  paintNetwork(boardId, canvasColor, network)
  return whatIsShown
}

function r3ShowVision(isBoardShown, state, boardId, canvasColor, network, buttonToHideId) {
    whatIsShown = "vision"
    hideElement(buttonToHideId)
    r3PaintNetworkVision(boardId, canvasColor, network)
    return whatIsShown
  }
