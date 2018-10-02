'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const dev = require("./Dev");
const tv = require("./TVSeries");
const movies = require("./Movies");
const music = require("./Music");
const login = require("./login");
const newUser = require("./NewUser");


const port = process.env.PORT || 8080;


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use(express.static(__dirname + "/build"));
app.use(express.static(__dirname + "/HTML"));

app.get("/", function (req, res, next) {
	res.redirect("/login");
});
app.use("/dev", dev);
app.use("/TVseries", tv);
app.use("/movies", movies);
app.use("/music", music);
app.use("/login", login);
app.use("/NewUser", newUser);


app.listen(port);
console.log("Server running in port: " + port);
