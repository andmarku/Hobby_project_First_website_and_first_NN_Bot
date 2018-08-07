function aiTrainer(network, learningRate, iterations, dataset) {
	var randomCase
  for (var i = 0; i < iterations; i++) {
		// Choose a random game to train with
		randomCase = Math.floor(Math.random()*dataset.length)

		// Train the network
		network.activate(dataset[randomCase].input)
		network.propagate(learningRate, dataset[randomCase].output)
  }
}
