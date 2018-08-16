{let state
addEventListener("load", () => {
  state = c4StartOnlineGame()

  document.getElementById("newGame").addEventListener("click", () => {
    state = c4StartOnlineGame()
  })

  document.getElementById("randomMove").addEventListener("click",  () => {
    c4RandomMove(state)
  })

  document.getElementById('c4Board').addEventListener("click", function(){
    c4PlayOnlineGame(state, columnClicked('c4Board', event.clientX, event.clientY,
      state.board.length, state.board[0].length))
  })
})
}
