'use strict';
const express = require('express');
const fs = require('fs');


const app = express();

app.get("/:drive", function (req, res) {
	var file = req.params.drive;
	var path = "/Data/" + file + ".txt";
	console.log(path);
	var stream = fs.createReadStream(__dirname+path);
	stream.on("open", function () {
		stream.pipe(res);
	});
	stream.on("error", function () {
		res.send("error");
	});

	fs.readFile("Data/" + file + ".txt", "utf8", (err, data) => {
		//console.log(data);
		if (err) throw err;
		var lines = data.split("\r\n");
		//console.log(lines);
		
	});
});
module.exports = app;