'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const tv = require("./TVSeries");
const movies = require("./Movies");
const music = require("./Music");

const app = express();

app.use("/TVseries", tv);
app.use("/Movies", movies);
app.use("/Music", music);

app.route("/").get((req, res) => {
	//if (req.session.profID && req.session.userId) {
		res.sendFile(__dirname + "/HTML/Home.html");
	//} else {
		
	//res.redirect("/Login");
	//}

}).post((req, res) => {
	//console.log(req.body.profileID);
	req.session.profID = req.body.profileID;
	res.sendFile(__dirname + "/HTML/Home.html");
	});

module.exports = app;
