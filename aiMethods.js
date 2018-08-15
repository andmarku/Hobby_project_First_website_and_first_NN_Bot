function createPerceptron(numInputlayer, arrWithNumInEachHiddenLayer, numOutputLayer) {
	let inputLayer = new window.synaptic.Layer(numInputlayer),
			outputLayer = new window.synaptic.Layer(numOutputLayer),
			hiddenLayer = []

	if (arrWithNumInEachHiddenLayer.length == 0) {
		inputLayer.project(outputLayer)
		return new window.synaptic.Network({
			input: inputLayer,
			output: outputLayer
		})
	}

	arrWithNumInEachHiddenLayer.map(numInLayer => {
		hiddenLayer.push(new window.synaptic.Layer(numInLayer))
	})

	inputLayer.project(hiddenLayer[0])
	for (var i = 0; i < hiddenLayer.length-1; i++) {
		hiddenLayer[i].project(hiddenLayer[i+1])
	}
	hiddenLayer[hiddenLayer.length-1].project(outputLayer)

	return new window.synaptic.Network({
		input: inputLayer,
		hidden: hiddenLayer,
		output: outputLayer
	})
}

function aiTrainer(network,learningRate, iterations,dataset) {
	let trainer = new window.synaptic.Trainer(network)
	trainer.train(dataset, {
		rate: learningRate,
		iterations: iterations,
		error: .005,
		shuffle: true,
		log: 1000,
		cost: window.synaptic.Trainer.cost.CROSS_ENTROPY
	})
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
}

function networkIntoBoard(network) {
  // Create a board to send to draw
  let input = [], hidden = [], output = [], thisLayer

	network.layers.input.list.map(node =>{
		input.push(node)
	})
	network.layers.hidden.map(layer =>{
		thisLayer = []
		layer.list.map(node => {
			thisLayer.push(node)
		})
		hidden.push(thisLayer)
	})
	network.layers.output.list.map(node =>{
		output.push(node)
	})
  return [input].concat(hidden,[output])
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

function layoutOfNeuron(network) {
	let maxIn = maxInput(network)
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

function maxInput(network) {
	let x, newBoardAsArray, boards = [],
			layer = network.layers.output,
			neuronsInLayer = reformatLayerStats(layer)
	neuronsInLayer.map(neuron => {
		newBoardAsArray = []
		neuron.inputConnections.map( conn => {
			x = conn.weight/neuron.sqrtOfSumOfSquaredWeights
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
