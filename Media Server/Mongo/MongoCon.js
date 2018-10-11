const MongoClient = require('mongodb').MongoClient;

const MONGO_URL_POST = 'mongodb://MaVidePost:MaVidePost2018@ds145562.mlab.com:45562/videokanta';
const MONGO_URL_GET = 'mongodb://MaVide:MaVide2018@ds145562.mlab.com:45562/videokanta';
const dbName = "videokanta";
var mongo = {};
mongo.connect = function (type, collection) {
	return  new Promise(function (resolve, reject) {
		if (type === "GET") {
			MongoClient.connect(MONGO_URL_GET, { useNewUrlParser: true }, function (err, client) {
				if (err) throw err;
				const db = client.db(dbName);
				const collec = db.collection(collection);
				resolve(collec);
			});
		} if (type === "POST") {
			MongoClient.connect(MONGO_URL_POST, { useNewUrlParser: true }, function (err, client) {
				if (err) throw err;
				const db = client.db(dbName);
				const collec = db.collection(collection);
				resolve(collec);
			});
		}
	});
};
module.exports = mongo;