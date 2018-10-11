'use strict';
const express = require('express').Router();
const api = require("./ExternalAPI/APIConn");
const mongo = require("./Mongo/MongoMovies");
const session = require('express-session');

const fs = require('fs');

const app = express;
app.route("/").get((req, res) => {
	res.sendFile(__dirname + "/HTML/Movie.html");
}).post((req, res) => {
	//console.log(req.body.movID);
	api.OneMovie(req.body.movID).then(result => {
		var data = {};
		var genrs = [];
		//console.log(result);
		data.userId = req.session.userId;
		data.profileId = req.session.profileId;
		data.id = result.id;
		data.Title = result.title;
		result.genres.forEach(dat => {
			genrs.push(dat.name);
		});
		data.genres = genrs;
		data.overview = result.overview;
		data.release = result.release_date;
		mongo.addNewMovie(data).then(s => {
			res.redirect("/Home");
		});

	});

});

app.get("/all", (req, res) => {
	mongo.getAllMovies().then(data => {
		res.send(data);
	}).catch(e => { res.send(e); });
});
app.get("/query/:search", (req, res) => {
	var query = req.params.search;

	api.searchMovie(query).then(result => {
		res.send(result);
		//console.log(result);
	});
});
app.get("/:id", (req, res) => {
	let id = req.params.id;
	//req.session.movID = id;
	mongo.getMovie(id).then(data => { res.send(data); })
		.catch(e => { res.send(e); });

});


module.exports = app;