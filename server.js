var fs = require("fs");

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var htmlRoutes = require(path.join(__dirname, "app", "routing", "htmlRoutes.js"));
var apiRoutes = require(path.join(__dirname, "app", "routing", "apiRoutes.js"));

var app = express()

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(path.join('app', 'css')));
app.use(express.static(path.join('app', 'frontEnd')));
app.use(express.static(path.join('app', 'images')));

// Set our port to 8080
var PORT = process.env.PORT || 8080;

app.get("/survey", htmlRoutes.htmlGet);
app.get("/api/friends", apiRoutes.APIGet);
app.post("/api/friends", apiRoutes.APIPost);
app.use(htmlRoutes.htmlUse);


app.listen(PORT, function(error){
	if (error){
		return console.log(error);
	}
	console.log("server is listening on http://localhost:%s", PORT);
})

