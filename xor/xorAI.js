{let myXorNetwork = createNetwork(numInputlayer=2,numHiddenLayer=2,numOutputLayer=1)

function createNetwork(numInputlayer, numHiddenLayer, numOutputLayer) {

	let inputLayer = new window.synaptic.Layer(numInputlayer)
	let hiddenLayer = new window.synaptic.Layer(numHiddenLayer)
	let outputLayer = new window.synaptic.Layer(numOutputLayer)

	inputLayer.project(hiddenLayer)
	hiddenLayer.project(outputLayer)

	return new window.synaptic.Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	})
}

function generateXorCases() {
	let cases = [
		{ input: [0,0], output: [1]	},
		{ input: [1,1], output: [1]	},
		{ input: [1,0], output: [0]	},
		{ input: [0,1], output: [0]	}
	]
	return cases
}

function trainXor(iterations) {
	aiTrainer(myXorNetwork, learningRate = 0.3, iterations, dataset = generateXorCases())
}

function testXorAi(boardAsArray) {
	return	Math.round(myXorNetwork.activate(boardAsArray))
}
}
