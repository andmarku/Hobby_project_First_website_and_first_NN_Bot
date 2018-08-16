{let boardId = "r3Board", state, postWinnerElement = "r3Res", canvasColor = "rgb(102,0,0)"
  addEventListener("load", () => {
    state = r3StartOnlineGame(boardId, canvasColor)

    document.getElementById("r3NewGame").addEventListener("click", function () {
      state = r3StartOnlineGame(boardId, canvasColor)
    })

    document.getElementById("r3RandomMove").addEventListener("click", function () {
        r3RandomMove(state, boardId, postWinnerElement, canvasColor)
    })

    document.getElementById(boardId).addEventListener("click", function(){
      let board = state.board, x = event.clientX, y = event.clientY,
          slot = { column: columnClicked(boardId,x,y, board.length, board[0].length),
                   row: rowClicked(boardId,x,y, board.length, board[0].length) }
      r3OnlineGame(state, slot, boardId, postWinnerElement, canvasColor)
    })
  })
}
