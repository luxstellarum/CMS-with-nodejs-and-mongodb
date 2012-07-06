
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


// Session
var SessionMemory = require('connect-redis')(express);
var app = module.exports = express.createServer();


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
 
  app.use(express.bodyParser());
  app.use(express.cookieParser());  
  app.use(express.session({
  	secret: 'key',
  	maxAge : new Date(Date.now() + 3600000), //1hours (session's life time) _ (JH/120703) 
  	store: new SessionMemory
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// sessions check
function requiresLogin(req, res, next){
	console.log('requiresLogin : ' + req.session.user.Id);

	if(req.session.user){
		console.log('session ok');
		next();
	}
	else{
		console.log('session no..');
		res.redirect('/');
	}
}

function requiresAdminLogin(req, res, next){
	console.log('requiresLogin : ' + req.session.user.Id);

	if(req.session.user.role == 'admin'){
		console.log('session ok');
		next();
	}
	else{
		console.log('session no..');
		res.redirect('/');
	}
}
// Routes

app.get('/', routes.index);

app.get('/admin', routes.admin);
app.get('/admin/userlists', requiresAdminLogin, routes.userlistView);
app.post('/user_information', requiresAdminLogin, routes.user_information_view);
app.post('/user_modify', requiresAdminLogin, routes.user_modify);

app.post('/join', routes.join);
app.post('/makeAccount', routes.makeaccount);

app.get('/board', requiresLogin ,routes.boardView);
app.get('/board/:id', routes.boardIdView);
app.post('/board_search', requiresLogin, routes.board_search);


app.get('/write', routes.write);
app.post('/board_write', routes.boardWrite);

app.get('/modify', routes.boardModify);
app.post('/update', routes.boardUpdate);

app.get('/delete', routes.boardDelete);

app.post('/comment_write', routes.commentWrite);


app.get('/sessions/new', routes.sessionNew);
app.post('/sessions', routes.session);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
