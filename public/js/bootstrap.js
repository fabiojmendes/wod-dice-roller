var socket = io.connect(window.location.protocol + '//' + window.location.host);

socket.on('refreshAll', function (history) {
	history.forEach(function(data) {
		appendRow(data);
	});
});


socket.on('refresh', function (data) {
	appendRow(data);
});

socket.on('ready', function () {
	$('#register').hide();	
	$('#form').show();
	$('#results').show();
	$('#action').focus();
});

function register() {
	socket.emit('register', $('#player').val());
}

function appendRow(data) {
	var row = $('<tr>');
	row.append(newTd(new Date(data.timestamp).toLocaleTimeString()));
	row.append(newTd(data.player, 'playerName'));
	row.append(newTd(data.action));
	row.append(newTd(data.diceCount, 'center'));
	//row.append(newTd(data.rerolls, 'center'));
	//row.append(newTd(formatResults(data.results)));
	row.append(newTd(data.sucesses, 'success'));
	row.hide();
	$('#results table tbody').prepend(row);
	row.fadeIn();
}

function newTd(value, cssClass) {
	var column = $('<td>')
	column.addClass(cssClass);
	column.text(value);
	return column;
}

function formatResults(results) {
	out = "";
	results.forEach(function(item, index, array) {
		out += item;
		if (index < array.length - 1) {
			out += " - ";
		}
	});
	return out;
}

function roll() {
	var diceCount = parseInt($('#diceCount').val());
	var action = $('#action').val();
	socket.emit('roll', {
		diceCount: diceCount,
		action: action
	});
}

$(document).ready(function() {
	$('#player').focus();
});
