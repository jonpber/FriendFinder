	var express = require("express");
	var app = express();
	var path = require("path");

	exports.htmlGet = function (req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	};

	exports.htmlUse = function (req, res) {
		res.sendFile(path.join(__dirname, "/../public/home.html"));

	}
