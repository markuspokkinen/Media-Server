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
	var add = new Promise((resol, rejec) => {
		MongoCon.connect("POST", table).then(collection => {
			collection.updateOne({ _id: data.id }, { $set: { _id: data.id, Title: data.Title, Genres: data.genres, Overview: data.overview, ReleseDate: data.release, addedByUser: data.userId, addedByProfile: data.profileId } }, { upsert: true }, (err, data) => {
				if (err) rejec(err);
				resol(data);
			});
		});
	});
	return add;
};
mongo.getMovie = (id) => {
	console.log(id);
	return new Promise((resol, reject) => {
		MongoCon.connect("GET", table).then(collection => {
			collection.find({ _id:id }, (err, cursor) => {
				console.log(err);
				cursor.count().then(data => {
					console.log(data);
				});

			});
		}).catch(e => { reject(e); });
	});
};

module.exports = mongo;
