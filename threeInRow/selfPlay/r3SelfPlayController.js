{let itrTrained = 0, state, boardId = "r3SelfBoard", whatIsShown = "board",
  textElement = "r3SelfText", canvasColor = "rgb(94,65,47)", network

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId, canvasColor)
  network = selfNetwork()

  /* Board listeners*/
  document.getElementById("r3SelfNewGame").addEventListener("click", function () {
    if(whatIsShown == "board")
      state = r3StartOnlineGame(boardId, canvasColor)
  })
  document.getElementById("r3SelfRandomMove").addEventListener("click", function () {
    if(whatIsShown == "board")
      r3RandomMove(state, boardId, textElement, canvasColor)
  })
  document.getElementById("r3SelfAiMove").addEventListener("click",  function () {
    if(whatIsShown == "board")
      r3MakeAiMove(network, state, boardId, textElement, canvasColor)
  })
  document.getElementById(boardId).addEventListener("click", function(){
    if(whatIsShown == "board")
      r3ColumnClicked(whatIsShown, state, boardId, canvasColor, textElement,
        event.clientX, event.clientY)
  })

  /* Network listeners*/
  document.getElementById("r3SelfTest").addEventListener("click", function() {
    stats = r3TestAI(network, iterations = 1000)
    postResAiTest(textElement, iterations, stats)
  })
  document.getElementById("r3SelfTrain").addEventListener("click", function() {
    // itrTrained = r3Train(textElement, network, newIterations = 5000, itrTrained, r3SelfPlay)
    itrTrained = r3Train(textElement, network, newIterations = 5000, itrTrained, learnTestBoard)
  })

  /* Canvas listeners*/
  document.getElementById("r3SelfShowBoard").addEventListener("click", function(){
    whatIsShown = r3ShowBoard(whatIsShown, state, boardId, canvasColor, network,
      pButtonId = "selfGameButtons")
  })
  document.getElementById("r3SelfShowNet").addEventListener("click", function(){
    whatIsShown = r3ShowNet(whatIsShown, state, boardId, canvasColor, network,
      pButtonId = "selfGameButtons")
  })
  document.getElementById("r3SelfShowVision").addEventListener("click", function(){
    whatIsShown = r3ShowVision(whatIsShown, state, boardId, canvasColor, network,
      pButtonId = "selfGameButtons")
  })
})
}
