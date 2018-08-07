{let selfItrTrained = 0, state, boardId = "r3SelfBoard", postWinnerElement = "r3SelfRes"

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId)

  document.getElementById("r3SelfNewGame").addEventListener("click", function () {
    state = r3StartOnlineGame(boardId)
  })
  document.getElementById("r3SelfRandomMove").addEventListener("click", function () {
    r3RandomMove(state, boardId, postWinnerElement)
  })
  document.getElementById("r3SelfAiMove").addEventListener("click",  function () {
    r3MakeAiMove(state, boardId, postWinnerElement)
  })

  document.getElementById("r3SelfTest").addEventListener("click", function() {
    iterations = 1000
    stats = r3TestAI(iterations)
    postReplace(element = "r3SelfAi","The AI won " + stats.won + ", drew " + stats.drawed +
      " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
  })

  document.getElementById("r3SelfTrain").addEventListener("click", function() {
    var newIterations = 5000
    selfItrTrained += newIterations
    r3SelfPlay(newIterations)
    postReplace(element = "r3SelfAi","Trained on for " + selfItrTrained + " iterations in total")
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
