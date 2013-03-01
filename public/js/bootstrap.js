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
	row.append(newTd(moment(data.timestamp).format('YYYY/MM/DD HH:mm:ss'), 'center'));
	row.append(newTd(data.player.name, 'playerName', data.player.color));
	row.append(newTd(data.action));
	row.append(newTd(data.diceCount, 'center'));
	var successsesColumn = newTd(data.sucesses, 'success', data.player.color);
	successsesColumn.attr('title', formatResults(data.results, data.rerolls));
	row.append(successsesColumn);
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

function formatResults(results, rerolls) {
	out = 'Resultados:\n';
	results.forEach(function(item, index, array) {
		out += 'd' + (index + 1) + '\t=\t' + item + '\n';
	});
	out += 'Dados extras: ' + rerolls;
	return out;
}

function formatDate(date) {
	return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " "
		 + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
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
