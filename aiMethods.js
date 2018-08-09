function createSmallNetwork(numInputlayer, numInHiddenLayer, numOutputLayer) {
	let inputLayer = new window.synaptic.Layer(numInputlayer),
		hiddenLayer = new window.synaptic.Layer(numInHiddenLayer),
		outputLayer = new window.synaptic.Layer(numOutputLayer)
	inputLayer.project(hiddenLayer)
	hiddenLayer.project(outputLayer)
	return new window.synaptic.Network({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	})
}

function aiTrainer(network, learningRate, iterations, dataset) {
	let randomCase
  for (let i = 0; i < iterations; i++) {
		// Choose a random game to train with
		randomCase = Math.floor(Math.random()*dataset.length)

		// Train the network
		network.activate(dataset[randomCase].input)
		network.propagate(learningRate, dataset[randomCase].output)
  }
}

function getNetworkProperties(canvasName, network) {
  let numLayers = 2 + network.layers.hidden.length,
  brickProp = getBrickProperties(canvasName, numLayers, maxNodesInLayer(network))
  return { 	radius : brickProp.radius,
				    xPadding : brickProp.xPadding,
				    yBetweenNodes : brickProp.yPadding }
}

function networkIntoBoard(network) { //TODO not general enogh
  // Create a board to send to draw
  input = [], hidden = [], output = []
  network.neurons().map( node => {
    if (node.layer == "input") {
      input.push(1)
    }else if (node.layer == 0) {
      hidden.push(1)
    } else {
      output.push(1)
    }
  })
  return [input, hidden, output]
}

function maxNodesInLayer(network) {
  // Check maximum nr of nodes in numLayers
  let maxInLayer = network.layers.input.size < network.layers.output.size?
  	network.layers.output.size: network.layers.input.size
  for (let i = 0; i < network.layers.hidden.length; i++) {
    maxInLayer = network.layers.hidden[i].size > maxInLayer?
    network.layers.hidden[i].size : maxInLayer
  }
  return maxInLayer
}
