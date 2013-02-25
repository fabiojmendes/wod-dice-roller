var diceRoller = require('./diceroller');

exports.init = function(server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket) {

		socket.emit('refreshAll', diceRoller.history());

		socket.on('register', function (player) {
			socket.set('player', player, function () {
				socket.emit('ready');
			});
		});

		socket.on('roll', function (data) {
			socket.get('player', function(err, player) {
				data.player = player;
				io.sockets.emit('refresh', diceRoller.roll(data));
			});
		});
	});
}
