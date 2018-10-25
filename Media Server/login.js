'use strict';
const express = require('express');
const mongo = require("./Mongo/MongoLogin");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator/check');


const app = express();

app.post("/",(req, res) => {
	//console.log(req.body);
	mongo.Login(req.body.User.Email).then(data => {
		//console.log(data);
		if (req.body.User.Password === data.Password) {
			req.session.userId = data._id;
			req.session.cookie.userId = data._id;
			//console.log(req.session.userId);
			console.log("success");
			res.json({user: true});
		} else {
			res.json("Email or Password was wrong");
		}

	}).catch(err => {
		//console.log(err);
		res.send(err);
	});
});

app.get("/Out", (req, res) => {
	//console.log("logged out");
	req.session.destroy();
	res.json({body: "loged"});
});
module.exports = app;