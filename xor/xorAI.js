function createXorNetwork() {
	return createPerceptron(numInputlayer=2,numHiddenLayer=[2],numOutputLayer=1)
}

function generateXorCases() {
	return [	{ input: [0,0], output: [1]	},
						{ input: [1,1], output: [1]	},
						{ input: [1,0], output: [0]	},
						{ input: [0,1], output: [0]	}	]
}

function trainXor(network, iterations) {
	aiTrainer(network, learningRate = 0.3, iterations, dataset = generateXorCases())
}

function testXorAi(network, boardAsArray) {
	return	Math.round(network.activate(boardAsArray))
}
