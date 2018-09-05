'use strict';
const express = require('express');
const fs = require('fs');

const dev = require("./Dev");
const tv = require("./TVSeries");
const movies = require("./Movies");
const music = require("./Music");


const port = process.env.PORT || 1337;


const app = express();

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
