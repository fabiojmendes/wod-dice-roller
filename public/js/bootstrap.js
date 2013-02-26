var socket = io.connect(window.location.protocol + '//' + window.location.host);

socket.on('refreshAll', function (history) {
	history.forEach(function(data) {
		appendRow(data);
	});
});


socket.on('refresh', function (data) {
	appendRow(data);
});

function appendRow(data) {
	var row = $('<tr>');
	row.append(newTd(new Date(data.timestamp).toLocaleTimeString()));
	row.append(newTd(data.player.name, 'playerName', data.player.color));
	row.append(newTd(data.action));
	row.append(newTd(data.diceCount, 'center'));
	//row.append(newTd(data.rerolls, 'center'));
	//row.append(newTd(formatResults(data.results)));
	row.append(newTd(data.sucesses, 'success', data.player.color));
	row.hide();
	$('#results table tbody').prepend(row);
	row.fadeIn();
}

function newTd(value, cssClass, color) {
	var column = $('<td>')
	column.addClass(cssClass);
	column.addClass('color' + color);
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
	$('#action').focus();
});
