{let  boardId = "xorBoard", state, canvasColor = "rgb(34,139,34)", itrTrained = 0,
      newIterations = 500, showBoard = true, network

  addEventListener("load", () => {
    state = xorNewGame(canvasColor, boardId), network = createXorNetwork()

    document.getElementById("xorTrainAi").addEventListener("click", function () {
      itrTrained += newIterations
      trainXor(network, newIterations)
      postReplace(element = "r3xorItr","Trained for " + itrTrained + " iterations in total")
    })

    document.getElementById("xorTestAi").addEventListener("click", function() {
      let aiAnswer = testXorAi(network, boardToArray(state.board))
      postAiResult(aiAnswer)
    })

    document.getElementById("xorEvaluate").addEventListener("click", function () {
      if (showBoard)
        postResult(isXor(state))
    })

    document.getElementById(boardId).addEventListener("click", function(){
      let x = event.clientX
      let y = event.clientY
      if (showBoard) {
        xorPlayOnlineGame(columnClicked(boardId, x,y, state.board.length,
          state.board[0].length),state,canvasColor, boardId)
      }
    })

    document.getElementById("xorShowNet").addEventListener("click", function() {
      console.log(network); // needed for unknown reason, otherwise the network doesn't update  
      showBoard = showBoard? false:true
      if (showBoard) {
        postReplace("xorShowNet", "Show network")
        xorpaintBoard(state.board, boardId, canvasColor)
      }else {
        postReplace("xorShowNet", "Show board")
        paintNetwork(boardId, canvasColor, network)
      }
    })
  })
}
