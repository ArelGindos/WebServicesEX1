var express = require('express'),
	http = require('http'),
    app = express(),
	port = process.env.PORT || 3000,
	fs = require('fs'),
    mongoose = require('mongoose'),
	db = mongoose.connect('mongodb://db_usr:db_pass@ds045454.mlab.com:45454/shenkargrades'),
 	User = require('./student'),
	ShenkarGrades = require('./grades_modules'),
	ShenkarSchool = null,tempJson;


mongoose.connection.once('open', function(){
	User.find({}, function(err,studentsData){
		console.log("connection established to mongoDB\nyou can now use the functions");
		ShenkarSchool = new ShenkarGrades(studentsData); // get all the json from mongoDB and send it to constructor
		mongoose.disconnect(); 
	});
});

app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	app.set('json spaces', 4);
  	res.set("Content-Type", "application/json");
  	next();
});

app.get('/getAllStudentsGrades', function(req,res){
	res.status(200).json(ShenkarSchool.getAllStudentsGrades());
});

app.get('/getStudGradeById/:id', function(req,res){
	tempJson = ShenkarSchool.getStudGradeById(req.params.id);
	if (tempJson.status == false){
		res.set('header-getStudGradeById',"wrong id input");
		res.status(400).json(tempJson);
	}
	else 
		res.status(200).json(tempJson);
});

app.get('/getExcellenceByYear/:year', function(req,res){
	tempJson = ShenkarSchool.getExcellenceByYear(req.params.year);
	if (tempJson.status == false){
		res.set('header-getExcellenceByYear',"cant find any studnet in the year");
		res.status(400).json(tempJson);
	}
	else 
		res.status(200).json(tempJson);
});

app.get('/getWorstAverageByYear/:year', function(req,res){
	tempJson = ShenkarSchool.getWorstAverageByYear(req.params.year);
	if (tempJson.status == false){
		res.set('header-getWorstAverageByYear',"cant find any studnet in the year");
		res.status(400).json(tempJson);
	}
	else 
		res.status(200).json(tempJson);
});

app.get('/', function(req,res){
	res.status(400).json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'https://github.com/ArelGindos/WebServicesEX1'});
	});


app.all('*', function(req,res){
	res.status(400).json({'Error' : 'oops... you pressed wrong path, please look at the api',
			  'api': 'https://github.com/ArelGindos/WebServicesEX1'});
});

http.createServer(app).listen(port);
console.log('server is on');
console.log('listening on port' + port);
