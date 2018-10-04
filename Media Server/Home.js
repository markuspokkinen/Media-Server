'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.route("/").get((req, res) => {
	if (req.session.profID && req.session.userId) {
		res.sendFile(__dirname + "/HTML/Home.html");
	} else {
		res.redirect("/Login");
	}

}).post((req, res) => {
	//console.log(req.body.profileID);
	req.session.profID = req.body.profileID;
	res.sendFile(__dirname + "/HTML/Home.html");
});

module.exports = app;
