
function selfNetwork() {
	return createSmallNetwork(numInputlayer=9,numHiddenLayer=16,numOutputLayer=9)
}

function complNetwork() {
	return createSmallNetwork(numInputlayer=9,numHiddenLayer=16,numOutputLayer=9)
}

function r3TrainAi(network, iterations) {
	console.log("Creating dataset");
	// Create a smaller dataset than iterations, so that the network can do each more that once
  let dataset = r3RandDataSet(size = 1 + Math.round(iterations/3))
	console.log("Training");
	aiTrainer(network, learningRate = 0.1, iterations, dataset)
  console.log("Training completed");
}


function r3RandDataSet(size) {
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
		almostWonBoard = convertBoardForAI(almostWonBoard, state.winner)
		// Create the correct answer
		correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
		correctAnswer = updateBoard(correctAnswer, lastMove.column, lastMove.row, value = 1)
		// Turn into array
		correctAnswer =  boardToArray(correctAnswer);
		almostWonBoard = boardToArray(state.board);
		// Store in the right format
		datapoint = {	input: almostWonBoard,
									output: correctAnswer	}
		dataset[i] = datapoint
	}
	r3NewGame() // Clear the last game from the memory
	return dataset
}

function r3AiMove(network, state) {
	board = convertBoardForAI(state.board, state.nextTurn)
	let output = network.activate(boardToArray(board))
	let aiOutput = arrayToBoard(board, output)
	return findR3AiMove(state, board, aiOutput)
}


function findR3AiMove(state, board, aiOutput) {
	let slotChosen, isLarger, isEmpty, largestOutputYet = 0
	for (let col = 0; col < aiOutput.length; col++) {
		for (let row = 0; row < aiOutput[0].length; row++) {
			isLarger = aiOutput[col][row] > largestOutputYet
			isEmpty = isPositionEmpty(state.board, col, row)
			if ( isLarger && isEmpty) {
				largestOutputYet = aiOutput[col][row]
				slotChosen = {	column: col,
												row: row }
			}
		}
	}
	return slotChosen // TODO: slotChosen may be undefined
}

function r3TestAI(network, iterations) {
	let wonGames = 0, draws = 0, losses
	for (let i = 0; i < iterations; i++) {
		state = r3NewGame()
		do{
			r3Game(state, randSlot(state.board))
			if( state.winner == 0){
				r3AiMove(network, state)
			}
		}	while ( state.winner == 0){}
		if (state.winner == -1) {
			wonGames++
		}else if (state.winner == 2) {
			draws++
		}
	}
	return { 	won: wonGames,
						lost: iterations - draws - wonGames,
						drawed: draws }
}

function testAI(network, state) {
	board = convertBoardForAI(state.board, state.nextTurn)
	let output = network.activate(boardToArray(board))
	let aiOutput = arrayToBoard(board, output)
	return aiOutput
}

function learnTestBoard(network) {
	let datapoint =
		[
			{ // player one
				input: [0, 0, 0, 0, 0, 0, 0, 0, 0],
				output: [1, 0, 0, 0, 0, 0, 0, 0, 0]
			}
			,
			{ // player two
				input: [-1, 0, 0, 0, 0, 0, 0, 0, 0],
				output: [0, 0, 0, 0, 1, 0, 0, 0, 0]
			}
			,
			{ // player one
				input: [1, 0, 0, 0, -1, 0, 0, 0, 0],
				output: [0, 0, 0, 1, 0, 0, 0, 0, 0]
			}
			,
			{ // player two
				input: [-1, 0, 0, -1, -1, 0, 0, 0, 0],
				output: [0, 0, 0,  0,  0, 1, 0, 0, 0]
			}
			,
			{ // player one
				input:  [1, 0, 0, 1, -1, -1, 0, 0, 0],
				output: [0, 0, 0, 0,  0,  0, 1, 0, 0]
			}
		]
	aiTrainer(network, learningRate = 0.2, iterations = 500, datapoint)
  console.log("Training completed");
}

function seeWeights(network) {
	console.log(network);
}
