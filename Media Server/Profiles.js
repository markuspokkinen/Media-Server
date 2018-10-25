'use strict';
const express = require('express').Router();
const mongo = require("./Mongo/MongoProfile");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express;

app.post("/", (req, res) => {
	//login profile
	req.session.profID = req.body.profileID;
	req.session.cookie.profID = req.body.profileID;
	res.json({ body: "profile chosen" });
});

app.post("/new", (req, res) => {
	//console.log(req.body);
	const name = req.body.profileName;
	//console.log(name);
	//console.log(req.session.userId);
	mongo.addProfile(req.session.userId, name).then(data => {
		res.json({ body: data });
	});
});
app.post("/update", (req, res) => {
	//console.log(req.body);
	mongo.updateProfile(req.body).then(resolved => {
		res.json(resolved);
	}).catch(rejected => {
		res.json(rejected);
	});
});

app.get("/all", (req, res) => {

	//console.log("all profiles");
	//console.log(req.session.userId);
	mongo.getProfiles(req.session.userId).then(profiles => {
		var retdat = [];
		profiles.forEach(function (element) {
			retdat.push({ id: element._id, name: element.ProfileName });
		});
		//console.log(retdat);
		res.json(retdat);
	}).catch(error => { res.json(error); });
});

app.route("/:id")
	.delete((req, res) => {
		let delID = req.params.id;
		//console.log(delID);
		mongo.removeProfile(delID).then(resolve => {
			res.json(resolve);
		}).catch(rej => {
			res.json(rej);
		});
	})
	.get((req, res) => {
		let profiD = req.params.id;
		//console.log(profiD);
		mongo.getOneProfile(profiD).then(resolved => {
			//console.log(resolved);
			res.json(resolved);
		}).catch(rejected => {
			res.json(rejected);
		});
	});



module.exports = app;