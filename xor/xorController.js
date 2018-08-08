{let boardId = "xorBoard", state, canvasColor = "rgb(34,139,34)", itrTrained = 0,
showBoard = true

  addEventListener("load", () => {
    state = xorNewGame(canvasColor)
    document.getElementById("xorTrainAi").addEventListener("click", function () {
      let newIterations = 500
      itrTrained += newIterations
      trainXor(newIterations)
      postReplace(element = "r3xorItr","Trained for " + itrTrained + " iterations in total")
    })
    document.getElementById("xorTestAi").addEventListener("click", function() {
      let boardAsArray = boardToArray(state.board)
      let aiAnswer = testXorAi(boardAsArray)
      postAiResult(aiAnswer)
    })

      document.getElementById("xorEvaluate").addEventListener("click", function () {
        if (showBoard) { postResult(isXor(state)) }
      })
      document.getElementById(boardId).addEventListener("click", function(){
        let x = event.clientX
        let y = event.clientY
        if (showBoard) {
          xorPlayOnlineGame(columnClicked(boardId, x,y, state.board.length,
            state.board[0].length),state,canvasColor)
        }
      })
    document.getElementById("showNet").addEventListener("click", function() {
      showBoard = showBoard? false:true
      if (showBoard) {
        xorDrawBoard(state.board,canvasColor)
      }else {
        xorShowNet(state.board,canvasColor)
      }
    })
  })
}
