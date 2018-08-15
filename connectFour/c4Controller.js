
addEventListener("load", () => {
  startOnlineGame()

  document.getElementById("newGame").addEventListener("click", startOnlineGame)

  document.getElementById("randomMove").addEventListener("click", makeRandomAiMove)

  document.getElementById('c4Board').addEventListener("click", function(){
    let newBoard = getC4BoardState()
    let x = event.clientX
    let y = event.clientY
    playOnlineGame(columnClicked('c4Board',x,y, newBoard.length, newBoard[0].length))
  })
})
