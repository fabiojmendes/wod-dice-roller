
/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, connect = require('connect');

var app = express();

var sessionStore = new connect.middleware.session.MemoryStore();

var cookieParser = express.cookieParser('wod');

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(cookieParser);
	app.use(express.session({ store: sessionStore }));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/register', routes.register)

app.get('/play', routes.play);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

var sockets = require('./src/sockets').init(server, sessionStore, cookieParser);
