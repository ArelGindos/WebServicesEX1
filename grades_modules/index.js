'use strict';

var EventEmitter = require('events').EventEmitter,
    express = require('express'),
    eventsConfig = require('./config').events;

var logData;

class ShenkarGrades extends EventEmitter {
    constructor(StudentsData) {
        super();
        this.json = null;
        this.data = StudentsData;

        // will send all the json
        this.on(eventsConfig.GETALL, function() {   
            if (this.data == null){
                this.data = StudentsData;
            }
        });

         // will run in a loop and search for id and return a json
        this.on(eventsConfig.GETSTUDENT, function(id) { 
           var jsonGrades = this.data.Grades.Students;
           var jsonStud = null;
           jsonGrades.forEach(function(entry) {
                if(entry.StudentId == id){
                    jsonStud = entry;
                }
            });
           if (jsonStud == null){
            jsonStud = {'Error': 'Wrong Id',
                       'ShowAll': 'to see the list of students => path: getAllStudentsGrades'};
            }
            this.json = jsonStud;
        });

        //will return the best student by the year
        this.on(eventsConfig.GETEXCELLENCESTUDENT, function(year) {
            var jsonGrades = this.data.Grades.Students;
            console.log(jsonGrades);
            var jsonStudent = null;
            var jsonGradesLen = jsonGrades.length;
            for(var i = 0;i<jsonGradesLen;i++){
                if(jsonGrades[i].year == year){
                    if(jsonStudent == null){
                        jsonStudent = jsonGrades[i];
                    }
                    if(jsonStudent != null &&   // if we got already student in the year, will compare the grade
                        jsonStudent.StudentAverageGrades<jsonGrades[i].StudentAverageGrades){
                        jsonStudent = jsonGrades[i];
                    }
                }
            }
            this.json = jsonStudent;
            if(jsonStudent==null){
                this.json = {'Error':'cant find any students in year: ' +year};
            }
        });
    }

    getAllStudentsGrades() {
        this.emit(eventsConfig.GETALL);
        return this.data;
    }

    getStudGradeById(id) {
       this.emit(eventsConfig.GETSTUDENT,id);
       return this.json;
    }

    getExcellenceByYear(year) {
        this.emit(eventsConfig.GETEXCELLENCESTUDENT,year);
        return this.json;
    }
}

module.exports = ShenkarGrades;











