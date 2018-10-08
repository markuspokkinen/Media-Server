const MongoCon = require('./MongoCon');
const api = require("../ExternalAPI/APIConn");
const table = "Elokuvat";

var mongo = {};
mongo.getAllMovies = () => {
	var data = new Promise((res, rej) => {
		MongoCon.connect("GET", table).then(collction => {
			collction.find().toArray((err, data) => {
				if (err) throw err;
				res(data);
			});
		});
	});
	return data;
};
mongo.addNewMovie = (data) => {
	var add = new Promise((resol, rejec) => {
		MongoCon.connect("POST", table).then(collection => {
			collection.updateOne({ _id: data.id }, { $set: { _id: data.id, Title: data.Title, Genres: data.genres, Overview: data.overview, ReleseDate: data.release } }, { upsert: true });
			resol("success");
		});
	});
	return add;
};


module.exports = mongo;
