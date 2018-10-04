const MongoCon = require('./MongoCon');
const table = "Login";

var mongo = {};

mongo.Login = function (userEmail) {
	var successful = new Promise(function (resolve, reject) {
		MongoCon.connect("GET", table).then((colle) => {
			colle.find({ Email: userEmail }).toArray(function (err, data) {
				if (err) {
					reject(err);
				} if (data.length === 1) {
					resolve(data[0]);
				} else {
					reject("Email or Password was wrong");
				}

			});

		});

	});
	return successful;
};

mongo.newLogin = function (Useremail, UserPassword) {
	var newuser = new Promise(function (resolve, reject) {
		MongoCon.connect("POST", table).then((colle) => {
			colle.find({ Email: Useremail }).toArray(function (err, data) {
				if (err) throw err;
				if (data.length === 0) {
					//add new User
					colle.updateOne({ Email: Useremail }, { $set: { Email: Useremail, Password: UserPassword } }, { upsert: true });
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