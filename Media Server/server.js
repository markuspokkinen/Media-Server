'use strict';
var express = require('express');
var fs = require('fs');
var port = process.env.PORT || 1337;


const app = express();

app.get("/read/:drive", function (req, res) {
	var file = req.params.drive;
	fs.readFile("Data/" + file + ".txt", "utf8", (err, data) => {
		//console.log(data);
		if (err) throw err;
		var lines = data.split("\r\n");
		//console.log(lines);
		res.send(lines);
	});
});

app.get("/video/:file", function (req, res) {
	console.log(req.params.file);
	fs.readFile(req.param.file, (err, data) => {
		if (err) throw err;
		console.log(data);
		res.send(data);
	});
});

app.listen(port);
console.log("Server running in port: " + port);
