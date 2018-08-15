function r3TrainerRandom(network, iterations) {
	console.log("Creating dataset");
	// Create a smaller dataset than iterations, so that the network can do each more that once
  let dataset = r3RandDataSet(size = 1 + Math.round(iterations/3))
	console.log("Training");
	aiTrainer(network, learningRate = 0.1, iterations, dataset)
  console.log("Training completed");
}

function r3RandDataSet(size) {
	size = 10
	let lastMove, almostWonBoard, correctAnswer, dataset = [], res = 0, tempBoard,
	 	randomSlot, datapoint
	for (let i = 0; i < size; i++) {
		do{ // Generate a random game
			state = r3NewGame()
			while( r3Game(state, randSlot(state.board)) == 0){
			}
		} while ( state.winner == 2)
		// Retrieve the winning move
		lastMove = state.lastMove
		// Get the board without the winning move
		almostWonBoard = updateBoard(state.board, column = lastMove.column,
		 			row = lastMove.row, value=0)
		// Switching the board for the ai
		almostWonBoard = prepareInputForAI(almostWonBoard, state.winner)
		// Create the correct answer
		correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
		correctAnswer = updateBoard(correctAnswer, lastMove.column, lastMove.row, value = 1)
		// Turn into array
		correctAnswer =  boardToArray(correctAnswer);
		// Store in the right format
		datapoint = {	input: almostWonBoard,
									output: correctAnswer	}
		dataset[i] = datapoint
	}
	return dataset
}
