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

function generateXorCases() {
	var cases = [
		{ input: [0,0], output: [1]	},
		{ input: [1,1], output: [1]	},
		{ input: [1,0], output: [0]	},
		{ input: [0,1], output: [0]	}
	]
	return cases
}

var myXorNetwork = createNetwork(numInputlayer=2,numHiddenLayer=2,numOutputLayer=1)

function trainXor() {
	aiTrainer(myXorNetwork, learningRate = 0.3, iterations = 1000, dataset = generateXorCases())
}

function testXorAi(input) {
	return	Math.round(myXorNetwork.activate(input))
}
