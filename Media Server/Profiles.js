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
	//login profile
	req.session.profID = req.body.profileID;
	req.session.cookie.profID = req.body.profileID;
	res.json({body:"profile chosen"});
	});

app.post("/new", (req, res) => {
	console.log(req.body);
	const name = req.body.profileName;
	console.log(name);
	console.log(req.session.userId);
	mongo.addProfile(req.session.userId, name).then(data => {
		res.json({ body: data });
	});
});
app.delete("/:id", (req, res) => {
	var profID = req.params.id;
	mongo.removeProfile(profID).then(resolve => {
		res.json(resolve);
	}).catch(rej => {
		res.json(rej);
	});
});

app.get("/all", (req, res) => {
	//console.log(req.session.userId);
	mongo.getProfiles(req.session.userId).then(profiles => {
		var retdat = [];
		profiles.forEach(function (element) {
			retdat.push({ id: element._id, name: element.ProfileName});
		});
		//console.log(retdat);
		res.json(retdat);
	});
});

module.exports = app;