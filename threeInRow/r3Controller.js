// var itrTrained = 0
//
// addEventListener("load", () => {
//   r3StartOnlineGame()
//
//   document.getElementById("r3NewGame").addEventListener("click", r3StartOnlineGame)
//
//   document.getElementById("r3AiMove").addEventListener("click", r3MakeAiMove)
//
//   document.getElementById("r3RandomMove").addEventListener("click", r3RandomMove)
//
//   document.getElementById("r3Test").addEventListener("click", function() {
//     iterations = 1000
//     stats = r3TestAI(iterations)
//     postReplace(element = "r3Ai","The AI won " + stats.won + ", drew " + stats.drawed +
//       " and lost " + stats.lost + " out of " + iterations + " vs a random bot")
//   })
//
//   document.getElementById("r3TrainWin").addEventListener("click", function() {
//     var newIterations = 5000
//     itrTrained += newIterations
//     r3TrainAi(newIterations)
//     postReplace(element = "r3Ai","Trained on for " + itrTrained + " iterations in total")
//   })
//
//   document.getElementById("r3TrainSelf").addEventListener("click", function() {
//     var newIterations = 5000
//     itrTrained += newIterations
//     r3SelfPlay(newIterations)
//     postReplace(element = "r3Ai","Trained on for " + itrTrained + " iterations in total")
//   })
//
//   document.getElementById('r3Board').addEventListener("click", function(){
//     var board = getR3BoardState(), x = event.clientX, y = event.clientY
//     var slot =
//       {
//         column: columnClicked('r3Board',x,y, board.length, board[0].length),
//         row: rowClicked('r3Board',x,y, board.length, board[0].length)
//       }
//     r3OnlineGame(slot)
//     }
//   )
// })
