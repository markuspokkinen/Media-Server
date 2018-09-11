'use strict';
var express = require('express');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = ' mongodb://MaVide:MaVide2018@ds145562.mlab.com:45562/videokanta';
const app = express();

app.get("/file", function (req, res) {
	//console.log(req.query);
	var file = req.query.file;
	var stat = fs.statSync(file);

	res.sendFile(file);
});
app.get("/:show", function (req, res) {

});
app.post("/Post", function (req, res) {
	MongoClient.connect(MONGO_URL, (err, database) => {
		if (err) throw err;
		var kanta = database.db("videokanta");
		var collec = kanta.collection("TV_Sarjat");

		collec.update(
			{ Nimi: req.body.name},
			{

			}, { upsert: true },
			function (error, mres) {
				if (error) {
					database.close();
					throw error;
				} else {
					res.send(mres);
				}
			}
		);
	});
});
module.exports = app;