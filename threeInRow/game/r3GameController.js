var itrTrained = 0

addEventListener("load", () => {
  r3StartOnlineGame(boardId = "r3Board")

  document.getElementById("r3NewGame").addEventListener("click", function () {
    r3StartOnlineGame(boardId = "r3Board")
  })

  document.getElementById("r3RandomMove").addEventListener("click", r3RandomMove)

  document.getElementById('r3Board').addEventListener("click", function(){
    var board = getR3BoardState(), x = event.clientX, y = event.clientY
    var slot =
      {
        column: columnClicked('r3Board',x,y, board.length, board[0].length),
        row: rowClicked('r3Board',x,y, board.length, board[0].length)
      }
    r3OnlineGame(slot, boardId = "r3Board")
    }
  )
})
