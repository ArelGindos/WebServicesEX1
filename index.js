var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 3000;
var fs = require('fs');

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds045454.mlab.com:45454/shenkargrades');
var User = require('./student');

var ShenkarGrades = require('./grades_modules');
var ShenkarSchool = null; 

mongoose.connection.once('open', function(){
	User.find({}, function(err,studentsData){
		console.log("connection established to mongoDB\nyou can now use the functions");
		ShenkarSchool = new ShenkarGrades(studentsData); // get all the json from mongoDB and send it to constructor
		mongoose.disconnect(); 
	});
});

app.get('/getAllStudentsGrades', function(req,res){
	res.json(ShenkarSchool.getAllStudentsGrades());
});

app.get('/getStudGradeById/:id', function(req,res){
	res.json(ShenkarSchool.getStudGradeById(req.params.id));
});

app.get('/getExcellenceByYear/:year', function(req,res){
	res.json(ShenkarSchool.getExcellenceByYear(req.params.year));
});

app.get('/getWorstAverageByYear/:year', function(req,res){
	res.json(ShenkarSchool.getWorstAverageByYear(req.params.year));
});

app.get('/', function(req,res){
	res.json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'https://github.com/ArelGindos/WebServicesEX1'});
	});


app.all('*', function(req,res){
	res.json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'https://github.com/ArelGindos/WebServicesEX1'});
});

http.createServer(app).listen(port);
console.log('server is on');
console.log('listening on port' + port);
