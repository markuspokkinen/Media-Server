const MongoCon = require('./MongoCon');
const ObjectId = require('mongodb').ObjectId;
const table = "Profiles";
var mongo = {};


mongo.getProfiles = function (userId) {
	return new Promise(function (resolve, reject) {
		MongoCon.connect("GET", table).then(collec => {
			collec.find({ UserID: userId }, { Profiles: 1 }).toArray((err, data) => {
				//console.log(data);
				if (err) {
					reject(err);
				}
				resolve(data);
			});
		}).catch(error => {
			//console.log(error);
			reject(error);
		});
	});
};
mongo.getOneProfile = function (profid) {
	console.log(profid);
	return new Promise((resolve, reject) => {
		MongoCon.connect("GET", table).then(collection => {
			collection.findOne({ _id: ObjectId(profid) }).then(res => {
				resolve(res);
				//console.log(res);
			}).catch(err => {
				reject(err);
			});
		}).catch(error => {
			reject(error);
		});
	});
};
mongo.updateProfile = function (profile) {
	return new promise((resolve, reject) => {
		MongoCon.connect("POST", table).then(collection => {
			collection.updateOne({ _id: ObjectId(profile.id) }, { ProfileName: profile.profilename, Moviefav: profile.Moviefav, TVfav: profile.TVfav }).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		});
	});
};

mongo.addProfile = function (userID, profilename) {
	return new Promise((resolve, reject) => {
		MongoCon.connect("POST", table).then(collec => {
			collec.insertOne({ UserID: userID, ProfileName: profilename, Moviefav: [], TVfav: [] }).then(dat => {
				//console.log(dat);
				resolve(dat);
			});

		});
	});
};
mongo.removeProfile = function (profid) {
	//console.log("remove");
	return new Promise((resolve, reject) => {
		MongoCon.connect("POST", table).then(collec => {
			//console.log("Remove conn");
			collec.deleteOne({ _id: ObjectId(profid) }).then(res => {
				//console.log("resolve");
				resolve(res);

			}).catch(e => {
				reject(e);
			});
		});
	});
};

module.exports = mongo;