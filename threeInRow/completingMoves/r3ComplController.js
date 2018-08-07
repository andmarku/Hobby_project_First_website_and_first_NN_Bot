var itrTrained = 0

addEventListener("load", () => {
  r3StartOnlineGame(boardId = "r3ComplBoard")

  document.getElementById("r3ComplNewGame").addEventListener("click", function () {
    r3StartOnlineGame(boardId = "r3ComplBoard")
  })
  document.getElementById("r3ComplRandomMove").addEventListener("click", r3RandomMove)
  document.getElementById("r3ComplAiMove").addEventListener("click", r3MakeAiMove)
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
  document.getElementById('r3ComplBoard').addEventListener("click", function(){
    var board = getR3BoardState(), x = event.clientX, y = event.clientY
    var slot =
      {
        column: columnClicked('r3ComplBoard',x,y, board.length, board[0].length),
        row: rowClicked('r3ComplBoard',x,y, board.length, board[0].length)
      }
    r3OnlineGame(slot, boardId = "r3ComplBoard")
    }
  )
})
