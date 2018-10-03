'use strict';
const express = require('express');
const mongo = require("./Mongo/MongoProfile");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.route("/").get((req, res) => {
	if (req.session.userId) {
		res.sendFile(__dirname + "/HTML/Profiles.html");
	} else {
		res.redirect("/Login");
	}
}).post((req, res) => {
	//add profile
	const name = req.body.profileName;
	mongo.addProfile(req.session.userId, name).then(data => {
		res.redirect("/Profiles");
	});
});

app.get("/all", (req, res) => {
	mongo.getProfiles(req.session.userId).then(profiles => {
		var retdat = [];
		profiles.forEach(function (element) {
			retdat.push({ id: element._id, name: element.ProfileName});
		});
		//console.log(retdat);
		res.send(retdat);
	});
});

module.exports = app;