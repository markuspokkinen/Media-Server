'use strict';
const express = require('express');
const fs = require('fs');


const app = express();

app.get("/:drive", function (req, res) {
	var file = req.params.drive;
	fs.readFile("Data/" + file + ".txt", "utf8", (err, data) => {
		//console.log(data);
		if (err) throw err;
		var lines = data.split("\r\n");
		//console.log(lines);
		res.send(lines);
	});
});
module.exports = app;