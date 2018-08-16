function selfNetwork() {
	return createPerceptron(numInputlayer=9,numHiddenLayer=[16],numOutputLayer=9)
}

function r3SelfPlay(network, iterations) {
	let learningRate = 0.3, aiIsPlayer
	for (let i = 0; i < iterations; i++) {
		do{
			state = r3NewGame()
			aiIsPlayer = Math.round(Math.random()) * 2 - 1 // either +1 or -1
			turn = 1
			do{
				if(turn == aiIsPlayer) // Ai turn
					r3Game(state, r3AiMove(network, state))
				else // Random turn
					r3Game(state, randSlot(state.board))
				turn = state.nextTurn
			}	while ( state.winner == 0)

			// Play another game until the ai has won the game
		}	while ( state.winner == 2 || state.winner*aiIsPlayer == -1 )

		// Ensure that the winner always is player one
		if (state.winner == -1) {
			state.board = state.board.map(col =>	col.map( element => element * -1 ))
			state.nextTurn = state.nextTurn * -1
			state.winner = state.winner * -1
		}

		match = createDatasetFromGameLog(state)
		aiTrainer(network, learningRate, itr = 1, match)
	}
}

function createDatasetFromGameLog(state) {
	let almostWonBoard, correctAnswer, dataset = []
	for (let i = state.log.length-1; i  >  -1; i--) {
		// Remove the last move from the board
		almostWonBoard = updateBoard(state.board, column = state.log[i].column,
			row = state.log[i].row, value=0)

		// Save only the winners moves
		if (state.log[i].player == state.winner){
			// Create input from board
			almostWonBoard = prepareInputForAi(almostWonBoard, state.log[i].player)

			// Create the correct answer
			correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
			correctAnswer = updateBoard(correctAnswer, state.log[i].column,
				state.log[i].row, value = state.log[i].player)
			correctAnswer =  boardToArray(correctAnswer);

			dataset.push({ 	input: almostWonBoard,
											output: correctAnswer	})
		}
	}
	return dataset
}

/* A data set for testing the network training*/
function learnTestBoard(network) {
	let inputBoard, outputBoard, datapoint = []

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[-1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[-1, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[-1, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, -1, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 0, -1]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, -1],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, -1, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAiWithDoubleInput(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)


	aiTrainer(network, learningRate = 0.2, iterations = 500, datapoint)
  console.log("Special training completed");
}
