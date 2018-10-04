const MongoCon = require('./MongoCon');
const api = require("../ExternalAPI/APIConn");
const table = "Elokuvat";

var mongo = {};
var addNewMovie = (data) => {
	var add = new Promise((resol, rejec) => {
		MongoCon.connect("POST", table).then(collection => {
			collection.updateOne({ _id: data.id }, { _id: data.id, Title: data.Title, Genres: data.genres, Overview: data.overview, Relese-date: data.release }, { upsert: true });

		});
	})
};


module.exports = mongo;
