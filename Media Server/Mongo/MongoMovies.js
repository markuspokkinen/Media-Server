const MongoCon = require('./MongoCon');
const objectId = require('mongodb').ObjectId;
const api = require("../ExternalAPI/APIConn");
const table = "Elokuvat";

var mongo = {};
mongo.getAllMovies = () => {
	return new Promise((res, rej) => {
		MongoCon.connect("GET", table).then(collction => {
			collction.find().toArray((err, data) => {
				if (err) rej(err);
				res(data);
			});
		});
	});
};
mongo.addNewMovie = (data) => {
	return new Promise((resol, rejec) => {
		MongoCon.connect("POST", table).then(collection => {
			collection.updateOne({ _id: data.id }, { $set: { _id: data.id, Title: data.Title, Overview: data.overview, ReleaseDate: data.release, addedByUser: data.userId, addedByProfile: data.profileId, src:"" } }, { upsert: true }, (err, data) => {
				if (err) rejec(err);
				resol(data);
			});
		});
	});
};
mongo.getMovie = (id) => {
	//console.log(id);
	return new Promise((resol, reject) => {
		MongoCon.connect("GET", table).then(collection => {
			collection.findOne({ _id: parseInt(id) })
				.then(res => { resol(res); })
				.catch(err => { reject(err); });

		});
	});
};

module.exports = mongo;
