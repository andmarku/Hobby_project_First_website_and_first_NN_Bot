{let boardId = "r3Board", state, postWinnerElement = "r3Res"

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId)

  document.getElementById("r3NewGame").addEventListener("click", function () {
    state = r3StartOnlineGame(boardId)
  })

  document.getElementById("r3RandomMove").addEventListener("click", function () {
      r3RandomMove(state, boardId, postWinnerElement)
  })

  document.getElementById(boardId).addEventListener("click", function(){
    var board = state.board, x = event.clientX, y = event.clientY
    var slot =
      {
        column: columnClicked(boardId,x,y, board.length, board[0].length),
        row: rowClicked(boardId,x,y, board.length, board[0].length)
      }
    r3OnlineGame(state, slot, boardId, postWinnerElement)
    }
  )
})
}
