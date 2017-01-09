var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var mysql  = require('mysql');
 var connection = mysql.createConnection({
 	'hostname': 'localhost',
 	'user':'root',
 	'password':'',
 	'database':'nodejs'
 });

 connection.connect(function(err){
 	if(err) throw err;
 	console.log('connection successfull');
 })


app.listen(7000, function(req, res){
	console.log('server running on 7000 port');
	app.use('/api', require('./api')(connection))
})