'use strict';
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const dev = require("./Dev");
const tv = require("./TVSeries");
const movies = require("./Movies");
const music = require("./Music");


const port = process.env.PORT || 8080;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + "/build"));

app.get("/", function (req, res) {
	res.sendFile(__dirname+"/build/index.html");
});
app.use("/dev", dev);
app.use("/TVseries", tv);
app.use("/movies", movies);
app.use("/music", music);


app.listen(port);
console.log("Server running in port: " + port);
