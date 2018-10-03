'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const dev = require("./Dev");
const tv = require("./TVSeries");
const movies = require("./Movies");
const music = require("./Music");
const login = require("./login");
const newUser = require("./NewUser");
const profiles = require("./Profiles");


const port = process.env.PORT || 8080;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
	secret: "here we go using sessions",
	resave: false,
	saveUninitialized: true
}));


app.use(express.static(__dirname + "/HTML"));

app.get("/", function (req, res, next) {
	res.redirect("/login");
});
app.use("/Dev", dev);
app.use("/TVseries", tv);
app.use("/Movies", movies);
app.use("/Music", music);
app.use("/Login", login);
app.use("/NewUser", newUser);
app.use("/Profiles", profiles);


app.listen(port);
console.log("Server running in port: " + port);