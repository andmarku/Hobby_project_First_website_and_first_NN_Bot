{let itrTrained = 0, boardId = "r3ComplBoard", state, whatIsShown = "board",
  textElement = "r3ComplText", canvasColor = "rgb(128,0,128)", network

addEventListener("load", () => {
  state = r3StartOnlineGame(boardId, canvasColor)
  network = complNetwork()

  /* Board listeners*/
  document.getElementById("r3ComplNewGame").addEventListener("click", function () {
    if(whatIsShown == "board")
      state = r3StartOnlineGame(boardId, canvasColor)
  })
  document.getElementById("r3ComplRandomMove").addEventListener("click", function () {
    if(whatIsShown == "board")
      r3RandomMove(state, boardId, textElement, canvasColor)
  })
  document.getElementById("r3ComplAiMove").addEventListener("click", function () {
    if(whatIsShown == "board")
      r3MakeAiMove(network, state, boardId, textElement, canvasColor)
  })
  document.getElementById(boardId).addEventListener("click", function(){
    if(whatIsShown == "board")
      r3ColumnClicked(whatIsShown, state, boardId, canvasColor, textElement,
        event.clientX, event.clientY)
    })

  /* Network listeners*/
  document.getElementById("r3ComplTest").addEventListener("click", function() {
    stats = r3TestAI(network, iterations = 1000)
    postResAiTest(textElement, iterations, stats)
  })
  document.getElementById("r3ComplTrain").addEventListener("click", function() {
    itrTrained = r3Train(textElement, network, newIterations = 1000, itrTrained, r3TrainerRandom)
  })

  /* Canvas listeners*/
  document.getElementById("r3ComplShowBoard").addEventListener("click", function(){
    whatIsShown = r3ShowBoard(whatIsShown, state, boardId, canvasColor, network,
      pButtonId = "complGameButtons")
  })
  document.getElementById("r3ComplShowNet").addEventListener("click", function(){
    console.log(network);
    whatIsShown = r3ShowNet(whatIsShown, state, boardId, canvasColor, network,
      pButtonId = "complGameButtons")
  })
})
}
