addEventListener("load", () => {
  xorNewGame()

  document.getElementById("xorEvaluate").addEventListener("click", function () {
    postResult(isXor(getXorBoard()))
  })
  document.getElementById("xorTrainAi").addEventListener("click", trainXor)

  document.getElementById("xorTestAi").addEventListener("click", function() {
    var boardAsArray = boardToArray(getXorBoard())
    var aiAnswer = testXorAi(boardAsArray)
    postAiResult(aiAnswer)
  })

  document.getElementById('xorBoard').addEventListener("click", function(){
    var xorBoard = getXorBoard()
    var x = event.clientX
    var y = event.clientY
    xorPlayOnlineGame(columnClicked('xorBoard', x,y, xorBoard.length, xorBoard[0].length))
    }
  )
})
