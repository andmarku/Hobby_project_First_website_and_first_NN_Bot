var myNet = createNetwork(numInputlayer=9,numHiddenLayer=9,numOutputLayer=9)

function createNetwork(numInputlayer, numHiddenLayer, numOutputLayer) {
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

function trainMyNet() {
  var iterations = 10000, learningRate = 0.3
	//console.log("Creating dataset");
	// Create a smaller dataset than iterations, so that the network can do each more that once
  var dataset = generateRandomGameDataSet(size = 1 + Math.round(iterations/3))

	//console.log("Initalizing training");
  for (var i = 0; i < iterations; i++) {
    if (i% (iterations/10) == 0) {
      //console.log(i + " iterations trained");
    }

		// Choose a random game to train with
		randomCase = Math.floor(Math.random()*dataset.length)

		// Train the network
		myC4Network.activate(dataset[randomCase].input)
		myC4Network.propagate(learningRate, dataset[randomCase].output)

  }
  console.log("Training completed");
}

function generateRandomGameDataSet(size) {
	var lastMove,almostWonBoard, correctAnswerAsArray
	var dataset = []
	for (var i = 0; i < size; i++) {
		// Generate a random game
		c4NewGame()
		while( gamePlay(randomColumn()) == 0){}

		// Retrieve the winning move
		lastMove = getLastMove()

		// Get the board without the winning move
		almostWonBoard = setBoard(board = getBoardState(), column = lastMove[0],
					row = lastMove[1], value=0)

		// Turn into array
		almostWonBoard = boardToArray(almostWonBoard);

		// Create the correct answer
		correctAnswerAsArray =  Array(7).fill(0)
    correctAnswerAsArray[lastMove[0]] = 1

		// Store in the right format
		dataset[i] = {
									input: almostWonBoard,
									output: correctAnswerAsArray
								}

		}
	return dataset
}

function generateLastMoveAiMove(board) {
	var aiOutput = myC4Network.activate(boardToArray(board))
	console.log(findAiWantedColumn(aiOutput));
	return findAiWantedColumn(aiOutput)
}

function findAiWantedColumn(aiOutput) {
	var moveChoosen, largestOutputYet = 0
	for (var i = 0; i < aiOutput.length; i++) {
		if (aiOutput[i] > largestOutputYet) {
			largestOutputYet = aiOutput[i]
			moveChoosen = i
		}
	}
	return moveChoosen
}

function getWeights() {
	var weights = myC4Network.neurons()
	console.log(weights);
}

//////////////////////////

function f() {
	a = temp()
	console.log(a[0]);
	console.log(myC4Network.activate(a[0]));
}

function temp() {
	c4NewGame()
	var rightAnswer = [1,0,0,0,0,0,0] //TODO
	var emptyBoard = boardToArray(getBoardState())
	return [emptyBoard, rightAnswer]
}
///////////////////////////////////
