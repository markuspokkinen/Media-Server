const MongoClient = require('mongodb').MongoClient;

const MONGO_URL_POST = 'mongodb://MaVidePost:MaVidePost2018@ds145562.mlab.com:45562/videokanta';
const MONGO_URL_GET = 'mongodb://MaVide:MaVide2018@ds145562.mlab.com:45562';
const dbName = "videokanta";
var mongo = {};

mongo.close = function (db) {
	db.close();
};


mongo.connect = function (type, collection) {
	var connection = new Promise(function (resolve, reject) {
		if (type === "GET") {
			MongoClient.connect(MONGO_URL_GET, { useNewUrlParser: true }, function (err, client) {
				if (err) reject(err);
				const db = client.db(dbName);
				const colle = db.collection(collection);
				resolve(colle);
			});
		} if (type === "POST") {
			MongoClient.connect(MONGO_URL_POST, { useNewUrlParser: true }, function (err, client) {
				if (err) reject(err);
				const db = client.db(dbName);
				const colle = db.collection(collection);
				resolve(colle);
			});
		}
	});
	return connection;
};

mongo.newLogin = function (Useremail, UserPassword) {
	var newuser = new Promise(function (resolve, reject) {
		mongo.connect("POST", "Login").then(collection => {
			collection.find({ _id: Useremail }).toArray(function (err, data) {
				if (data.length === 0) {
					//add new User
					collection.updateOne({ "_id": Useremail }, { $set: { "_id": Useremail, "password": UserPassword } }, { upsert: true });
					resolve("Success");
				} else {
					reject("User Already exits");
				}
			});

		});
	});
	return newuser;
};

module.exports = mongo;