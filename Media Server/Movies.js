'use strict';
const express = require('express');
const api = require("./ExternalAPI/APIConn");
const mongo = require("./Mongo/MongoMovies");
const session = require('express-session');

const fs = require('fs');

const app = express();
app.route("/").post((req, res) => {
	//console.log(req.body);

	var data = {};
	//console.log(result);
	data.userId = req.session.userId;
	data.profileId = req.session.profID;
	data.id = req.body.id;
	data.Title = req.body.name;
	data.overview = req.body.desc;
	data.release = req.body.release;
	mongo.addNewMovie(data).then(s => {
		//console.log(s);
		res.json(s);
	})
		.catch(err => { res.json(err); });

}).get((req, res) => {
	mongo.getAllMovies()
		.then(data => { res.send(data); })
		.catch(e => { res.send(e); });
});
app.get("/query/:search", (req, res) => {
	var query = req.params.search;
	//console.log(query);
	api.searchMovie(query)
		.then(result => { res.json(result); })
		.catch(err => { res.json(err); });
});
app.get("/:id", (req, res) => {
	let id = req.params.id;
	req.session.movID = id;
	mongo.getMovie(id)
		.then(data => {res.send(data);})
		.catch(e => { res.send(e); });

});


module.exports = app;