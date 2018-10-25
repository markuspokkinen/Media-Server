'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//const dev = require("./Dev");
const login = require("./login");
const newUser = require("./NewUser");
const profiles = require("./Profiles");
const home = require("./Home");
//const tv = require("./TVSeries");
const movies = require("./Movies");
//const music = require("./Music");


const port = process.env.PORT || 8080;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(__dirname + "/HTML"));
app.use(express.static(__dirname + "/build"));
app.use(cookieParser());
app.use(session({
	secret: "local1",
	resave: true,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: new Date(Date.now() + 604800000),
		maxAge: 604800000
	}
}));
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});
app.get("/session", (req, res) => {
	if (req.session.userId && req.session.profID) {
		res.json({
			user: true,
			profile: true
		});
	} else if (req.session.userId) {
		res.json({
			user: true,
			profile: false
		});
	} else {
		res.json({
			user: false,
			profile: false
		});
	}
});

//app.use("/Dev", dev);
app.use("/Login", login);
app.use("/NewUser", newUser);
app.use("/Profiles", profiles);
app.use("/Home", home);
//app.use("/TVseries", tv);
app.use("/Movies", movies);
//app.use("/Music", music);

app.listen(port);
console.log("Server running in port: " + port);