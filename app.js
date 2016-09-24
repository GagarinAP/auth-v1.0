var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var Users = require('./db/db.json');
var module      =   require('./module/module.js');

var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({	
    name: 'cookie',    
    proxy: true,
    resave: true,
    saveUninitialized: true,
    secret: 'dgdfgdfTRUUICJKMGHBDF'
}));


app.use(express.static(__dirname + '/public'));

/*app.get('/users', function(req,res){
  res.send(Users);
});

app.post('/users', function(req,res){
	console.log(req.body);
	var login = req.body.login;
	var password = req.body.password;
	res.send(Users.push(req.body));
});

app.get('/users/:id', function(req, res){	
	var id = req.params.id;
	for (var i = 0; i < Users.length; i++) {
		if(id == Users[i]){
			return res.send(Users[i]);
		}
	};
	return res.send(400);
});

app.put("/users/:id", Auth, function(req,res){
    var id = req.params.id;
	for (var i = 0; i < Users.length; i++) {
		if(id == Users[i]){
			return res.send(Users[i]);
		}
	};
	return res.send(400);   
});

app.delete("/users/:id", Auth, function(req,res){
    var id = req.params.id;
	for (var i = 0; i < Users.length; i++) {
		if(id == Users[i]){
			delete Users[i];
		}
	};
	return res.send(400);
});*/
app.get('/users', function(req,res){       
    res.send(module._find());
});

app.post('/users', function(req,res){
    res.send(module._save(req.body));        
});

app.get("/users/:id", function(req,res){
    res.send(module._findById(req.params.id));
});

app.put("/users/:id", function(req,res){
    res.send(module._saveId(req.params.id,req.body));    
});

app.delete("/users/:id", function(req,res){
    res.send(module._remove(req.params.id));
});



app.get("/session", function(req, res){ 
	console.log(req.body);
	if(req.session.user){
		res.send(200, {
			auth : true,
			user : req.session.user
		});
	}else{
		res.send(401, {
			auth : false			
		});
	}
});

app.post("/session/login", function(req, res){ 
	//console.log(Users[1]);
	//console.log('Cookies: ', req.cookies);
	var login = req.body.login;
	var password = req.body.password;
	for (var i = 0; i < Users.length; i++) {
		var user = Users[i];
		if(user.login == login && user.password == password){
			req.session.user = user;
			return res.send(200, {
				auth : true,
				user : user
			});
		}
	};
	return res.send(401);
});


app.delete("/logout", function(req, res){ 
	req.session.user = null;	
});

function Auth (req, res, next) {
	if(req.session.user){
		next();
	}else{
		res.send(401,{
			flash : 'Plase log in first'
		});
	}
}

app.listen(3000, function(){
  console.log('Server run in 3000 port');
})
