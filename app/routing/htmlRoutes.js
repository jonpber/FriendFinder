// Requiring dependencies
var http = require("http");
var fs = require("fs");
var url = require("url");

var express = require("express");
var app = express()
// Set our port to 8080
var PORT = 8080;

// respond with "hello world" when a GET request is made to the homepage
app.get('/survey', function (req, res) {
	fs.readFile(__dirname + "/../public/survey.html", function(error, data){
		if (error){
			throw error;
		}

		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(data);
	});
})

app.use('/', function (req, res) {
	fs.readFile(__dirname + "/../public/home.html", function(error, data){
		if (error){
			throw error;
		}

		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(data);
	});
})

app.listen(PORT, function(error){
	if (error){
		return console.log(error);
	}
	console.log("server is listening on http://localhost:%s", PORT);
})
