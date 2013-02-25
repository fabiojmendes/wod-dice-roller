history = [];

exports.history = function() {
	return history;
}

exports.roll = function(data) {
	var rollResult = rollDices(data.diceCount);
	result = {
		timestamp: new Date(),
		player: data.player,
		action: data.action,
		diceCount: data.diceCount,
		sucesses: rollResult.sucesses,
		results: rollResult.results,
		rerolls: rollResult.rerolls
	}
	saveToHistory(result);
	return result;
}

function rollDices(diceCount) {
	var sucesses = 0;
	var results = [];
	var rerolls = 0;
	for (var i = 0; i < diceCount; i++) {
		var dice = Math.floor(Math.random() * 10 + 1);
		if (dice >= 8) {
			sucesses++;
		}
		if (dice == 10) {
			rerolls++;
		}
		results.push(dice);
	}
	if (rerolls > 0) {
		var rerollResults = rollDices(rerolls);
		sucesses += rerollResults.sucesses;
		rerollResults.results.forEach(function(element) {
			results.push(element);
		});
		rerolls += (rerollResults.rerolls);
	}
	return {
		sucesses: sucesses,
		results: results,
		rerolls: rerolls
	}
}

function saveToHistory(data) {
	history.push(data);
	while (history.length > 15) {
		history.shift();
	}
}
