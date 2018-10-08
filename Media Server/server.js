'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const dev = require("./Dev");

const login = require("./login");
const newUser = require("./NewUser");
const profiles = require("./Profiles");
const home = require("./Home");


const port = process.env.PORT || 8080;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
	secret: "here we go using sessions",
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: 3600
	}
}));


app.use(express.static(__dirname + "/HTML"));

app.get("/", function (req, res, next) {
	res.redirect("/Login");
});
app.use("/Dev", dev);
app.use("/Login", login);
app.use("/NewUser", newUser);
app.use("/Profiles", profiles);
app.use("/Home", home);

app.listen(port);
console.log("Server running in port: " + port);