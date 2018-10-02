'use strict';
const express = require('express');
const mongo = require("./MongoConnection");

const app = express();

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/HTML/newuser.html");
});
app.post("/", function (req, res) {
	const email = req.body.User.Email;
	const password = req.body.User.Password;
	mongo.newLogin(email, password).then(loginres => {
		console.log(loginres);
	}).catch(err => {
		console.log(err);
	});
});

module.exports = app;