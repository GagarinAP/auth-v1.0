var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');


mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.configure(function() {
	app.use(express.logger('dev')); 
	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); 

	app.set('view engine', 'ejs');
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.session({ secret: 'hello' })); 
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
	app.use(function (req, res, next) {//Show ip users
	  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  console.log('Client IP:', ip);
	  next();
	});
});

require('./app/routes.js')(app, passport); 

app.listen(port, function(){
	console.log('SERVER run on localhost:' + port);
});