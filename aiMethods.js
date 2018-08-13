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
  return { 	numLayers: numLayers,
						radius : brickProp.radius,
				    xPadding : brickProp.xPadding,
				    yBetweenNodes : brickProp.yPadding }
}
function getNodeForwardConnections(node) {
 let 	id = node.id,
 			inputs = node.connections.inputs,
 			projections = node.connections.projected

			// input.from gives neuron
			// projections.to gives neuron
			// ... .weight gives weight
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

function vision(network) {
	return maxInput(network.layers.hidden[0])
}

function layoutOfNeuron(network) {
	let maxIn = vision(network)
	return { 	columns: maxIn.length/calcGreatestDivider(maxIn),
															rows:calcGreatestDivider(maxIn) }
}

function calcGreatestDivider(maxIn) {
	let sqrt = Math.sqrt(maxIn.length), greatestDivider = 1
	// skips i = 0, i =1 to avoid problems with dividing by zero, and 1 is assumed
	for (var i = 2; i < maxIn.length; i++) {
		if (i > sqrt)
			break
		if( maxIn.length % i == 0 )
			greatestDivider = i
	}
	return greatestDivider
}

function maxInput(layer) {
	let boards = [], newBoardAsArray, neuronsInLayer = reformatLayerStats(layer), x
	neuronsInLayer.map(neuron => {
		newBoardAsArray = []
		neuron.inputConnections.map( conn => {
			x = Math.round(conn.weight/neuron.sqrtOfSumOfSquaredWeights)
			newBoardAsArray.push(x)
		})
		boards.push(arrayToBoard(createBoard(3,3), newBoardAsArray))
	})
	return boards
}

function reformatLayerStats(layer) {
	let inputConnections, neuronsInLayer=[], connection, sumOfSquaredWeights
	layer.list.map( neuron => {
		inputConnections = [], sumOfSquaredWeights = 0
		for (var key in neuron.connections.inputs) {
			connection = {	from: neuron.connections.inputs[key].from.ID,
											weight: neuron.connections.inputs[key].weight  }
			inputConnections.push(connection)
			sumOfSquaredWeights += connection.weight * connection.weight
		}
		neuronsInLayer.push( {  id: neuron.connections.inputs[key].to.ID,
														inputConnections: inputConnections,
														sqrtOfSumOfSquaredWeights: Math.sqrt(sumOfSquaredWeights)	})
	})
	return neuronsInLayer
}
