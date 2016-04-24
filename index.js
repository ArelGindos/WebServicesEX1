var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var fs = require('fs');
var jsonData = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
var ShenkarGrades = require('./grades_modules');
var ShenkarSchool = new ShenkarGrades(jsonData);

app.get('/getAllStudentsGrades', function(req,res){
	res.json(ShenkarSchool.getAllStudentsGrades());
});

app.get('/getStudGradeById/:id', function(req,res){
	res.json(ShenkarSchool.getStudGradeById(req.params.id));
});

app.get('/getExcellenceByYear/:year', function(req,res){
	res.json(ShenkarSchool.getExcellenceByYear(req.params.year));
});

app.get('/', function(req,res){
	res.json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'https://github.com/ArelGindos/WebServicesEX1'});
	});


app.all('*', function(req,res){
	res.json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'www.github.com'});
});


app.listen(port);
console.log('listening on port' + port);
