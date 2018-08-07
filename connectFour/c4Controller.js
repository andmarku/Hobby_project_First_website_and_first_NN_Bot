
addEventListener("load", () => {
  startOnlineGame()

  document.getElementById("newGame").addEventListener("click", startOnlineGame)

  document.getElementById("randomMove").addEventListener("click", makeRandomAiMove)

  // document.getElementById("aiMove").addEventListener("click", makeLastMoveAiMove)

  // document.getElementById("trainAi").addEventListener("click", trainMyNet)

  document.getElementById('c4Board').addEventListener("click", function(){
    var newBoard = getC4BoardState()
    var x = event.clientX
    var y = event.clientY
    playOnlineGame(columnClicked('c4Board',x,y, newBoard.length, newBoard[0].length))
    }
  )
})
