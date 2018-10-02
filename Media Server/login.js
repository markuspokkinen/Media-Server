'use strict';
const express = require('express');

const app = express();

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/HTML/login.html");
});
app.post("/", function (req, res) {
	console.log(req.body.User);
	res.send("success");
});
module.exports = app;