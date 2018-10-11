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
});
module.exports = app;