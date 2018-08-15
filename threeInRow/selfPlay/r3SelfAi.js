function selfNetwork() {
	return createPerceptron(numInputlayer=18,numHiddenLayer=[18,8,8,8,9],numOutputLayer=9)
}

function r3SelfPlay(network, iterations) {
	learningRate = 0.1
	console.log("In selfplay trainer");
	console.log("Training");
	for (let i = 0; i < iterations; i++) {
		state = r3NewGame()
		while( r3Game(state, r3AiMove(network, state)) == 0){}

		// If the game ended in draw, play against random instead
		if( state.winner == 2){
			console.log("in draw ");
			state = r3NewGame()
			do{
				r3Game(state, randSlot(state.board))
				if( r3Game(state, r3AiMove(network, state)) == 2){}
			}	while ( state.winner == 2){}
		}

		match = createDatasetFromGameLog(state)
		aiTrainer(network, learningRate, itr = 1, match)
	}
  console.log("Training completed");
}

function createDatasetFromGameLog(state) {
	// console.log(state);
	let almostWonBoard, correctAnswer, dataset = [], counter = 1
	for (let i = state.log.length-1; i  >  -1; i--) {

		// Remove the last move
		almostWonBoard = updateBoard(state.board, column = state.log[i].column,
			row = state.log[i].row, value=0)

		// Save only the winners moves
		if (counter % 2 == 1 ){
			// Create the correct answer
			correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
			correctAnswer = updateBoard(correctAnswer, state.log[i].column,
				state.log[i].row, value = state.log[i].player)

			// Create input from board
			almostWonBoard = prepareInputForAI(almostWonBoard, state.log[i].player)

			// Turn into array
			correctAnswer =  boardToArray(correctAnswer);

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

function learnTestBoard(network) {
	let inputBoard, outputBoard, datapoint = []

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[-1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[-1, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[-1, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, -1, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 0, -1]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, -1],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, -1, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	//////////////////////////////// second move ////////////////////////////

	inputBoard = [	[-1, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[1, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[-1, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 1],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[-1, 0, 0]	]
	outputBoard = [	[1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, -1, 0]	]
	outputBoard = [	[1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 0, -1]	]
	outputBoard = [	[0, 0, 1],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, -1],
									[0, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, -1, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[1, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	////////////////////////////// third move ////////////////////////////

	inputBoard = [	[1, 0, 0],
									[0, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 0, 1]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[1, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 1],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[1, 0, 0]	]
	outputBoard = [	[0, 0, 1],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, 0],
									[0, 1, 0],
									[0, 1, 0]	]
	outputBoard = [	[0, 1, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, 0, -1],
									[0, 1, 0],
									[0, -1, 1]	]
	outputBoard = [	[1, 0, 0],
									[0, 0, 0],
									[0, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[0, -1, 1],
									[0, 1, -1],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[1, 0, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	inputBoard = [	[-1, 1, 0],
									[-1, 1, 0],
									[0, 0, 0]	]
	outputBoard = [	[0, 0, 0],
									[0, 0, 0],
									[0, 1, 0]	]
	datapoint.push(	{	input: prepareInputForAI(inputBoard, turn=1),
										output: boardToArray(outputBoard)	}	)

	aiTrainer(network, learningRate = 0.2, iterations = 500, datapoint)
  console.log("Special training completed");
}
