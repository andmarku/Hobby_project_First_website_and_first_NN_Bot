{let boardId = "xorBoard", state, canvasColor = "rgb(34,139,34)", itrTrained = 0,
showBoard = true, network

  addEventListener("load", () => {
    state = xorNewGame(canvasColor, boardId), network = createXorNetwork()
    document.getElementById("xorTrainAi").addEventListener("click", function () {
      let newIterations = 500
      itrTrained += newIterations
      trainXor(network, newIterations)
      postReplace(element = "r3xorItr","Trained for " + itrTrained + " iterations in total")
    })
    document.getElementById("xorTestAi").addEventListener("click", function() {
      let aiAnswer = testXorAi(network, boardToArray(state.board))
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
          state.board[0].length),state,canvasColor, boardId)
      }
    })
    document.getElementById("showNet").addEventListener("click", function() {
      showBoard = showBoard? false:true
      if (showBoard) {
        xorDrawBoard(state.board, boardId, canvasColor)
      }else {
        paintNetwork(boardId, canvasColor, network)
      }
    })
  })
}
