var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	Student;
// Scehma for mongoDB students for use it in the model
var schema_name = new schema({
	studentId: Number,
	studentName: String,
	studentAge: Number,
	studentAverageGrades: Number,
	bestYear:Number
}, {collection: 'Grades'});

Student = mongoose.model('Student', schema_name);

module.exports = Student;
