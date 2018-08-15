
function selfNetwork() {
	return createPerceptron(numInputlayer=18,numHiddenLayer=[48,18],numOutputLayer=9)
}

function complNetwork() {
	return createPerceptron(numInputlayer=18,numHiddenLayer=[9],numOutputLayer=9)
}

function r3AiMove(network, state) {
	let arrayBoard = prepareInputForAI(state.board, state.nextTurn),
			output = network.activate(arrayBoard),
			aiOutput = arrayToBoard(state.board, output)
	return findR3AiMove(state, aiOutput)
}

function findR3AiMove(state, aiOutput) {
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

function prepareInputForAI(board, turn) {
	let aiBoard = createBoard(board.length, board[0].length),
	opponentBoard = createBoard(board.length, board[0].length),
	player
	for (var column= 0; column < board.length; column++) {
		for (var row = 0; row < board[column].length; row++) {
			// make sure that Ai always plays as 1 (not -1)
			player = board[column][row] * turn
			// normalize the data (go from -1,0,+1 to 0.5,0, 1)
			player = player == 0? player : player * 0.25 + 0.75
			if (player == 1) {
				updateBoard(aiBoard, column, row, player)
			}else if (player == 0.5) {
				updateBoard(opponentBoard, column, row, player)
			}
		}
	}
	return boardToArray(aiBoard).concat(boardToArray(opponentBoard))
}

function r3TestAI(network, iterations) {
	let wonGames = 0, draws = 0, losses, turn
	for (let i = 0; i < iterations; i++) {
		state = r3NewGame()
		turn = Math.round(Math.random())
		//turn = 0
		do{
			if(turn == 1){
				r3Game(state, randSlot(state.board))
			}	else{
				r3AiMove(network, state)
			}
			turn = turn == 1? 0 : 1
		}	while ( state.winner == 0){}
		if (state.winner == 1) {
			wonGames++
		}else if (state.winner == 2) {
			draws++
		}
	}
	return { 	won: wonGames,
		lost: iterations - draws - wonGames,
		drawed: draws }
	}
