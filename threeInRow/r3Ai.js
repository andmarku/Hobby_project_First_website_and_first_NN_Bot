function r3AiMove(network, state) {
	let arrayBoard = prepareInputForAiWithDoubleInput(state.board, state.nextTurn),
			output = network.activate(arrayBoard),
			aiOutput = arrayToBoard(state.board, output)
	return findR3AiMove(state, aiOutput)
}

// Returns the largest of the network outputs if its a valid move
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
	return slotChosen
}

function prepareInputForAiWithDoubleInput(board, turn) {
	let aiBoard = createBoard(board.length, board[0].length),
			opponentBoard = createBoard(board.length, board[0].length),
			player
	for (var column= 0; column < board.length; column++) {
		for (var row = 0; row < board[column].length; row++) {
			// make sure that Ai always plays as 1 (not -1)
			player = board[column][row] * turn
			// normalize the data (go from -1,0,+1 to 0.5,0, 1)
			player = player == 0? player : player * 0.25 + 0.75
			if (player == 1)
				updateBoard(aiBoard, column, row, player)
			else if (player == 0.5)
				updateBoard(opponentBoard, column, row, player)
		}
	}
	return boardToArray(aiBoard).concat(boardToArray(opponentBoard))
}

function prepareInputForAi(board, turn) {
	let aiBoard = createBoard(board.length, board[0].length)
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[i].length; j++) {
			aiBoard = updateBoard(aiBoard, i, j, board[i][j]*turn)
		}
	}
	return boardToArray(aiBoard)
}

// For the Test AI-button
function r3TestAI(network, iterations) {
	let wonGames = 0, draws = 0, losses=0, turn, result, aiIsPlayer
	for (let i = 0; i < iterations; i++) {
		state = r3NewGame()
		aiIsPlayer = Math.round(Math.random()) * 2 - 1 // either +1 or -1
		turn = 1
		do{
			if(turn == aiIsPlayer) // AIs turn
				r3Game(state,r3AiMove(network, state))
			else // Randoms turn
				r3Game(state, randSlot(state.board))
			turn = state.nextTurn
		}	while ( state.winner == 0){}
		result = state.winner * aiIsPlayer //if ai is -1 then -1 is win, else -1 is loss etc
		if (result == 1)
			wonGames++
		else if (result == 2 || result == -2)
			draws++
		else // The case result == -1
			losses++
	}
	return { 	won: wonGames,
		lost: losses,
		drawed: draws }
	}

// Assumes "double board input" to network
function incorporateTakenSlotsIntoOutput(inputArr, outputArr) {
	for (var i = 0; i < inputArr.length/2; i++) {
		if ( inputArr[i] != 0 || inputArr[i+inputArr.length/2] !=0)
			outputArr[i] = 0	// set wrong answers to 0
		else
			outputArr[i] = outputArr[i] == 0? 0.25 : outputArr[i] // set the "not right but not totally wrong" to 0.25
	}
	return outputArr
}
