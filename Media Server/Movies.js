'use strict';
const express = require('express');
const api = require("./ExternalAPI/APIConn");

const fs = require('fs');

const app = express();

app.route("/").get((req, res) => {

}).post((req, res) => {
		
	});
app.get("/query/:search", (req, res) => {
	var query = req.params.search;

	api.searchMovie(query).then(result => {
		res.send(result);
		//console.log(result);
	});
});

module.exports = app;