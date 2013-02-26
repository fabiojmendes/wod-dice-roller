/*
 * GET home page.
 */

exports.index = function(req, res) {
	var player = req.session.player ? req.session.player : {};
	res.render('index', { player: player });
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
