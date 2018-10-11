const MongoCon = require('./MongoCon');
const ObjectId = require('mongodb').ObjectId;
const table = "Profiles";
var mongo = {};


mongo.getProfiles = function (userId) {
	var profiles = new Promise(function (resolve, reject) {
		MongoCon.connect("GET", table).then(collec => {
			collec.find({ UserID: userId }, { Profiles: 1 }).toArray((err, data) => {
				//console.log(data);
				if (err) {
					console.log(err);
					throw err;
				}
				resolve(data);
			});
		});
	});
	return profiles;
};

mongo.addProfile = function (userID, profilename) {
	var add = new Promise((resolve, reject) => {
		MongoCon.connect("POST", table).then(collec => {
			collec.insertOne({ UserID: userID, ProfileName: profilename, Moviefav: [], TVfav: [] }).then(dat => {
				//console.log(dat);
				resolve(dat);
			});

		});
	});
	return add;
};
mongo.removeProfile = function (profid) {
	//console.log("remove");
	return new Promise((resolve, reject) => {
		MongoCon.connect("POST", table).then(collec => {
			//console.log("Remove conn");
			collec.deleteOne({ _id: ObjectId(profid)}).then(res => {
				console.log("resolve");
				resolve(res);

			}).catch(e => {
				reject(e);
			});
		});
	});
};

module.exports = mongo;