{let itrTrained = 0, boardId = "r3ComplBoard", state, isBoardShown = true,
  textElement = "r3ComplText", canvasColor = "rgb(128,0,128)", network

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId, canvasColor)
  network = complNetwork()

  document.getElementById("r3ComplNewGame").addEventListener("click", function () {
    if(isBoardShown)
      state = r3StartOnlineGame(boardId, canvasColor)
  })
  document.getElementById("r3ComplRandomMove").addEventListener("click", function () {
    if(isBoardShown)
      r3RandomMove(state, boardId, textElement, canvasColor)
  })
  document.getElementById("r3ComplAiMove").addEventListener("click", function () {
    if(isBoardShown)
      r3MakeAiMove(network, state, boardId, textElement, canvasColor)
  })
  document.getElementById("r3ComplTest").addEventListener("click", function() {
    stats = r3TestAI(network, iterations = 1000)
    postResAiTest(textElement, iterations, stats)
  })
  document.getElementById("r3ComplTrain").addEventListener("click", function() {
    itrTrained = r3Train(textElement, network, newIterations = 5000, itrTrained)
  })
  document.getElementById(boardId).addEventListener("click", function(){
    r3ColumnClicked(isBoardShown, state, boardId, canvasColor, textElement,
      event.clientX, event.clientY)
  })
  document.getElementById("r3ComplShowNet").addEventListener("click", function(){
    isBoardShown = r3ShowNet(isBoardShown, state, boardId, canvasColor, network,
      buttonId = "r3ComplShowNet", pButtonId = "complGameButtons")
  })
})
}
