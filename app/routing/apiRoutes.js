var express = require("express");
var app = express()
var bodyParser = require("body-parser");
var path = require("path");
var friends = require(path.join(__dirname, "../data/friends.js"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

exports.APIGet = function (req, res) {
	res.json(friends);
}

exports.APIPost = function (req, res) {
	res.json(findBestMatch(req.body, friends.friends));
	friends.friends.push(req.body);
	res.end();
}

function compFriends(friend1, friend2){
		var match = 0;

		for (var i =0; i < 10; i++){
			match += Math.abs(friend1.scores[i] - friend2.scores[i]);
		}
		return match;
	}

function findBestMatch(me, friendArr){
	var bestScore = 100;
	var bestMatch;

	for (var i = 0; i < friendArr.length; i++){
		var friendScore = compFriends(me, friendArr[i]);
		if (friendScore < bestScore){
			bestMatch = friendArr[i];
			bestScore = friendScore;
		}
	}

	return bestMatch;
}