/*
 * GET home page.
 */

exports.index = function(req, res) {
	res.render('index', {
		colors: [
			'#000066',
			'#006600',
			'#660000',
			'#996633',
			'#006699',
			'#cccc00',
			'#00cc33',
			'#ff0000'
		]
	});
};

exports.register = function(req, res) {
	req.session.player = {
		name: req.body.player,
		color: req.body.color
	}
	res.redirect('play');
};

exports.play = function(req, res) {
	if (req.session.player) {
		res.render('play', { player: req.session.player });
	} else {
		res.redirect('/');
	}
}
