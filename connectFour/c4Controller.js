{let state, canvasName = 'c4Board', textElement =  "c4Post"
addEventListener("load", () => {
  state = c4StartOnlineGame(canvasName)

  document.getElementById("newGame").addEventListener("click", () => {
    state = c4StartOnlineGame(canvasName)
  })

  document.getElementById("randomMove").addEventListener("click",  () => {
    c4RandomMove(state, canvasName, textElement)
  })

  document.getElementById('c4Board').addEventListener("click", () => {
    c4PlayOnlineGame(state, columnClicked('c4Board', event.clientX, event.clientY,
      state.board.length, state.board[0].length),  canvasName, textElement)
  })
})
}
