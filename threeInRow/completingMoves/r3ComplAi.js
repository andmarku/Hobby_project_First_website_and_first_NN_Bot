function complNetwork() {
	return createPerceptron(numInputlayer=18,numHiddenLayer=[16,8],numOutputLayer=9)
}

function r3TrainerRandom(network, iterations) {
	// Create a smaller dataset than iterations, so that the network can do each more that once
  let dataset = r3RandDataSet(size = 1 + Math.round(size=300))
	aiTrainer(network, learningRate = 0.1, iterations, dataset)
}

function r3RandDataSet(size) {
	let lastMove, almostWonBoard, correctAnswer, dataset = [], datapoint
	for (let i = 0; i < size; i++) {
		// Generate a random game, which doesnt end in draw
		do{
			state = r3NewGame()
			// Play until the game is finished
			while( r3Game(state, randSlot(state.board)) == 0){}
		} while ( state.winner == 2)
		// Retrieve the winning move
		lastMove = state.lastMove

		// Remove the winning move from the board
		almostWonBoard = updateBoard(state.board, column = lastMove.column,
		 			row = lastMove.row, value=0)
		// Set the Ai as player one on the input and create the input so that each
		// side have designated input nodes
		prepareInputForAi(almostWonBoard, state.nextTurn)
		almostWonBoard = prepareInputForAiWithDoubleInput(almostWonBoard, state.winner)

		// Create the a correct answer
		correctAnswer = createBoard(state.board.length, state.board[0].length)
		correctAnswer = updateBoard(correctAnswer, lastMove.column, lastMove.row, value = 1)
		correctAnswer = boardToArray(correctAnswer);
		correctAnswer = incorporateTakenSlotsIntoOutput(inputArr = almostWonBoard,
			outputArr = correctAnswer)

		dataset[i] = {	input: almostWonBoard,
									output: correctAnswer	}
	}
	return dataset
}
