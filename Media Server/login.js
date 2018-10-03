'use strict';
const express = require('express');
const mongo = require("./Mongo/MongoLogin");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator/check');


const app = express();

app.route("/").get((req, res) => {
	if (req.session.userId && req.session.profID) {
		res.redirect("/Home");
	}
	if (req.session.userId) {
		res.redirect("/profiles");
	} else {
		res.sendFile(__dirname + "/HTML/login.html");
	}
}).post((req, res) => {
	mongo.Login(req.body.User.Email).then(data => {
		//console.log(data);
		if (req.body.User.Password === data.Password) {
			req.session.userId = data._id;
			//console.log(req.session.userId);
			res.redirect("/profiles");
		} else {
			res.stus(422).json({error:"Email or Password was wrong"});
		}

	}).catch(err => {
		console.log(err);
		res.send(err);
	});
	});

app.get("/Out", (req, res) => {
	req.session.destroy();
	res.redirect("/Login");
});
module.exports = app;