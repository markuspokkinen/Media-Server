'use strict';
const express = require('express');
const mongo = require("./Mongo/MongoLogin");
const { check, validationResult } = require('express-validator/check');


const app = express();

app.route("/").get((req, res) => {
	res.sendFile(__dirname + "/HTML/newuser.html");

}).post([
	check('User[Email]').isEmail(),
	check('User[Password]').isLength({ min: 7 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const email = req.body.User.Email;
	const password = req.body.User.Password;
	mongo.newLogin(email, password).then(loginres => {
		console.log(loginres);
		res.redirect("/login");
	}).catch(err => {
		console.log(err);
		res.staus(422).json({errors:err});
	});
});
module.exports = app;