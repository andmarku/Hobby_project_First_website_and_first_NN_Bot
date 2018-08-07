
function r3SelfPlay(itr) {
	var iterations = 50, learningRate = 0.1
	console.log("Training");

	for (var i = 0; i < itr/iterations; i++) {
		state = r3NewGame()
		while( r3Game(state, r3AiMove(state)) == 0){}

		// If the game ended in draw, play against random instead
		if( state.winner == 2){
			console.log("in draw ");
			state = r3NewGame()
			do{
				r3Game(state, randSlot(state.board))
				if( r3Game(state, r3AiMove(state)) == 2){}
			}	while ( state.winner == 2){}
		}

		match = createDatasetFromGameLog(state.log)
		aiTrainer(myR3Network, learningRate, iterations, match)
	}
	// Clear the last game from the memory
	state = r3NewGame()
  console.log("Training completed");
}


function createDatasetFromGameLog(gameLog) {
	var almostWonBoard, correctAnswer, dataset = [], counter = 1
	for (var i = gameLog.length -1; i  >  -1; i--) {
		// Remove the last move
		almostWonBoard = updateBoard(state.board, column = gameLog[i].column,
		row = gameLog[i].row, value=0)

		// Switching the board for the ai
		almostWonBoard = convertBoardForAI(almostWonBoard, gameLog[i].player)

		// Save only the winners moves
		if (counter % 2 == 1 ){
			// Create the correct answer
			correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
			correctAnswer = updateBoard(correctAnswer, gameLog[i].column, gameLog[i].row, value = gameLog[i].player)

			// Turn into array
			correctAnswer =  boardToArray(correctAnswer);
			almostWonBoard = boardToArray(state.board);

			// Store in the right format
			datapoint = {
				input: almostWonBoard,
				output: correctAnswer
			}
			dataset.push(datapoint)
		}

		counter++

	}
	return dataset
}
