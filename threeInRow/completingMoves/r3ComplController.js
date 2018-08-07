{let itrTrained = 0, boardId = "r3ComplBoard", state, postWinnerElement = "r3ComplRes"

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId)

  document.getElementById("r3ComplNewGame").addEventListener("click", function () {
    state = r3StartOnlineGame(boardId)
  })
  document.getElementById("r3ComplRandomMove").addEventListener("click", function () {
      r3RandomMove(state, boardId, postWinnerElement)
  })
  document.getElementById("r3ComplAiMove").addEventListener("click", function () {
    r3MakeAiMove(state, boardId, postWinnerElement)
  })
  document.getElementById("r3ComplTest").addEventListener("click", function() {
    iterations = 1000
    stats = r3TestAI(iterations)
    postReplace(element = "r3ComplAi","The AI won " + stats.won + ", drew " + stats.drawed +
      " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
  })
  document.getElementById("r3ComplTrain").addEventListener("click", function() {
    var newIterations = 5000
    itrTrained += newIterations
    r3TrainAi(newIterations)
    postReplace(element = "r3ComplAi","Trained on for " + itrTrained + " iterations in total")
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
