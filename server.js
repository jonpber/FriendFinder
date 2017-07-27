var fs = require("fs");

var express = require("express");
var bodyParser = require("body-parser");
var nodePath = require("path");

var htmlRoutes = require(__dirname + "/app/public/home.html");

var app = express()
// Set our port to 8080
var PORT = 8080;


app.listen(PORT, function(error){
	if (error){
		return console.log(error);
	}
	console.log("server is listening on http://localhost:%s", PORT);
})

