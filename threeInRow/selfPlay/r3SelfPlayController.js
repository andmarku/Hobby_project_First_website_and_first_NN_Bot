{let itrTrained = 0, state, boardId = "r3SelfBoard", whatIsShown = "board",
  textElement = "r3SelfText", canvasColor = "rgba(94,65,47,1)", network

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
        r3ColumnClicked(state, boardId, canvasColor, textElement,
          event.clientX, event.clientY)
    })

    /* Network listeners*/
    document.getElementById("r3SelfTest").addEventListener("click", function() {
      stats = r3TestAI(network, iterations = 1000)
      postResAiTest(textElement, iterations, stats)
    })

    document.getElementById("r3SelfTrain").addEventListener("click", function() {
      itrTrained = r3Train(textElement, network, newIterations = 500, itrTrained, r3SelfPlay)
    })

    /* Canvas listeners*/
    document.getElementById("r3SelfShowBoard").addEventListener("click", function(){
      whatIsShown = r3ShowBoard(state, boardId, canvasColor, network,
        pButtonId = "selfGameButtons")
    })

    document.getElementById("r3SelfShowNet").addEventListener("click", function(){
      console.log(network); // needed for unknown reason, otherwise the network doesn't update
      whatIsShown = r3ShowNet(state, boardId, canvasColor, network,
        pButtonId = "selfGameButtons")
    })

    document.getElementById("r3SelfShowVision").addEventListener("click", function(){
      console.log(network); // needed for unknown reason, otherwise the network doesn't update  
      whatIsShown = r3ShowVision(state, boardId, color = "rgba(94,65,47,1)", network,
        pButtonId = "selfGameButtons")
    })
  })
}
