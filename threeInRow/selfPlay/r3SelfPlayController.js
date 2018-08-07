var itrTrained = 0

addEventListener("load", () => {
  r3StartOnlineGame(boardId = "r3SelfBoard")

  document.getElementById("r3SelfNewGame").addEventListener("click", function () {
    r3StartOnlineGame(boardId = "r3SelfBoard")
  })
  document.getElementById("r3SelfRandomMove").addEventListener("click", r3RandomMove)
  document.getElementById("r3SelfAiMove").addEventListener("click", r3MakeAiMove)

  document.getElementById("r3SelfTest").addEventListener("click", function() {
    iterations = 1000
    stats = r3TestAI(iterations)
    postReplace(element = "r3SelfAi","The AI won " + stats.won + ", drew " + stats.drawed +
      " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
  })

  document.getElementById("r3SelfTrain").addEventListener("click", function() {
    var newIterations = 5000
    itrTrained += newIterations
    r3SelfPlay(newIterations)
    postReplace(element = "r3SelfAi","Trained on for " + itrTrained + " iterations in total")
  })

  document.getElementById('r3SelfBoard').addEventListener("click", function(){
    var board = getR3BoardState(), x = event.clientX, y = event.clientY
    var slot =
      {
        column: columnClicked('r3SelfBoard',x,y, board.length, board[0].length),
        row: rowClicked('r3SelfBoard',x,y, board.length, board[0].length)
      }
    r3OnlineGame(slot, boardId = "r3SelfBoard")
    }
  )
})
