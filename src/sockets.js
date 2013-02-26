var diceRoller = require('./diceroller');

exports.init = function(server, sessionStore, cookieParser) {
	var io = require('socket.io').listen(server),
		SessionSockets = require('session.socket.io'),
		sessionSockets = new SessionSockets(io, sessionStore, cookieParser);

	sessionSockets.on('connection', function(err, socket, session) {

		socket.emit('refreshAll', diceRoller.history());

		socket.on('roll', function (data) {
			if (session) {
				data.player = session.player;
			} else {
				data.player = { name: 'No Name' };
			}
			console.log('Session on socket.io: ' + session);
			io.sockets.emit('refresh', diceRoller.roll(data));
		});
	});
}
