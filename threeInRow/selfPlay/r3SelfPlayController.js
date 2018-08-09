{let itrTrained = 0, state, boardId = "r3SelfBoard", isBoardShown = true,
  postWinnerElement = "r3SelfRes", canvasColor = "rgb(94,65,47)", network

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId, canvasColor)
  network = selfNetwork()

  document.getElementById("r3SelfNewGame").addEventListener("click", function () {
    if(isBoardShown)
      state = r3StartOnlineGame(boardId, canvasColor)
  })
  document.getElementById("r3SelfRandomMove").addEventListener("click", function () {
    if(isBoardShown)
      r3RandomMove(state, boardId, postWinnerElement, canvasColor)
  })
  document.getElementById("r3SelfAiMove").addEventListener("click",  function () {
    if(isBoardShown)
      r3MakeAiMove(network, state, boardId, postWinnerElement, canvasColor)
  })

  document.getElementById("r3SelfTest").addEventListener("click", function() {
    stats = r3TestAI(network, iterations = 1000)
    postResAiTest(element = "r3SelfAi", iterations, stats)
  })

  document.getElementById("r3SelfTrain").addEventListener("click", function() {
    itrTrained = r3Train(element = "r3SelfAi", network, newIterations = 5000, itrTrained)
  })

  document.getElementById(boardId).addEventListener("click", function(){
    r3ColumnClicked(isBoardShown, state, boardId, canvasColor, postWinnerElement,
      event.clientX, event.clientY)
  })
  document.getElementById("r3SelfShowNet").addEventListener("click", function(){
    isBoardShown = r3ShowNet(isBoardShown, state, boardId, canvasColor, network)
  })
})
}
