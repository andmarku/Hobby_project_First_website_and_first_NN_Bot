function r3CreateNetwork(numInputlayer, numHiddenLayer, numOutputLayer) {

	var inputLayer = new window.synaptic.Layer(numInputlayer)
	var hiddenLayer = new window.synaptic.Layer(numHiddenLayer)
	var outputLayer = new window.synaptic.Layer(numOutputLayer)

	inputLayer.project(hiddenLayer)
	hiddenLayer.project(outputLayer)

	return new window.synaptic.Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	})

}

var myR3Network = r3CreateNetwork(numInputlayer=9,numHiddenLayer=16,numOutputLayer=9)

function r3TrainAi(itr) {
	var iterations = itr, learningRate = 0.1

	console.log("Creating dataset");
	// Create a smaller dataset than iterations, so that the network can do each more that once
  var dataset = r3RandDataSet(size = 1 + Math.round(iterations/3))
	console.log("Training");
	aiTrainer(myR3Network, learningRate, iterations, dataset)
  console.log("Training completed");
}


function r3RandDataSet(size) {
	var lastMove, almostWonBoard, correctAnswer, dataset = []
	var res = 0, tempBoard, randomSlot, datapoint
	for (var i = 0; i < size; i++) {
		// Generate a random game
		do{
			r3NewGame()
			while( r3Game(randSlot(getR3BoardState())) == 0){
				// randomSlot = randSlot(getR3BoardState())
				// res = r3Game(randomSlot)
			}
		} while ( getR3Winner() == 2)
		// Retrieve the winning move
		lastMove = getR3LastMove()


		// Get the board without the winning move
		 almostWonBoard = updateBoard(getR3BoardState(), column = lastMove.column,
		 			row = lastMove.row, value=0)

		// Switching the board for the ai
		almostWonBoard = convertBoardForAI(almostWonBoard, getR3Winner)

		// Create the correct answer
		correctAnswer = createBoard(almostWonBoard.length, almostWonBoard[0].length)
		correctAnswer = updateBoard(correctAnswer, lastMove.column, lastMove.row, value = 1)

		// Turn into array
		correctAnswer =  boardToArray(correctAnswer);
		almostWonBoard = boardToArray(getR3BoardState());

		// Store in the right format
		datapoint = {
									input: almostWonBoard,
									output: correctAnswer
								}
		dataset[i] = datapoint
	}
	// Clear the last game from the memory
	r3NewGame()

	return dataset
}

function r3CreateALastMove(board, player) {
	board = convertBoardForAI(board, player)
	var output = myR3Network.activate(boardToArray(board))
	var aiOutput = arrayToBoard(board, output)
	return findR3AiMove(board, aiOutput)
}


function findR3AiMove(board, aiOutput) {
	var slotChosen, isLarger, isEmpty, largestOutputYet = 0
	for (var col = 0; col < aiOutput.length; col++) {
		for (var row = 0; row < aiOutput[0].length; row++) {
			isLarger = aiOutput[col][row] > largestOutputYet
			isEmpty = isPositionEmpty(getR3BoardState(), col, row)
			if ( isLarger && isEmpty) {
				largestOutputYet = aiOutput[col][row]
				slotChosen = {
					column: col,
					row: row
				}
			}
		}
	}

	// TODO: slotChosen may be undefined
	return slotChosen
}

function r3TestAI(iterations) {
	let wonGames = 0, draws = 0, losses
	for (var i = 0; i < iterations; i++) {
		r3NewGame()
		do{
			r3Game(randSlot(getR3BoardState()))
			if( getR3Winner() == 0){
				r3CreateALastMove(getR3BoardState())
			}
		}	while ( getR3Winner() == 0){}
		if (getR3Winner() == -1) {
			wonGames++
		}else if (getR3Winner() == 2) {
			draws++
		}
	}
	losses = iterations - draws - wonGames
	return {
		won: wonGames,
		lost: losses,
		drawed: draws
	}
}

function testAI() {
	board = convertBoardForAI(getR3BoardState(), getr3PlayerTurn())
	var output = myR3Network.activate(boardToArray(board))
	var aiOutput = arrayToBoard(board, output)
	return aiOutput
}

function learnTestBoard() {
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
	var iterations = 500, learningRate = 0.2
	aiTrainer(myR3Network, learningRate, iterations, datapoint)
  console.log("Training completed");
}

function seeWeights() {
	console.log(myR3Network);
}
