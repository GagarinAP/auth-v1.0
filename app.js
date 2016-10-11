var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var userModule = require('./models/userModule.js');
var appView = require('./views/appView.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api', function(req,res){
  res.send('API is running');
});
app.post('/authenticate', function (req, res) {
    res.send(appView.authenticate(req.body)) ;
});
app.get('/hello', function (req, res) {
  userModule.authorize(req, res, function () {
    return appView.hello(req.query);
  });  
});

app.listen(3000, function(){
  console.log('Server run 3000 port');
});
