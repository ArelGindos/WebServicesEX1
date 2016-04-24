var http = require('http'),
    express = require('express');

var app = express();

app.get('/', function(request, response) {
    response.send("server is on");
});

http.createServer(app).listen(3000);
