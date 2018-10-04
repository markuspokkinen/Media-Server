const request = require('request');
const apiID_url = "https://api.themoviedb.org/3/movie/?api_key=d6d6fca6e513373972e1653239fa2dc3";
const apiSearch_url = "https://api.themoviedb.org/3/search/movie/?api_key=d6d6fca6e513373972e1653239fa2dc3";
var api = {};

api.searchMovie = (dat) => {
	var result = new Promise((resolve, reject) => {

		request(apiSearch_url + "&query=" + dat, { json: true },
			(err, res, body) => {
				if (!err && res.statusCode === 200) {
					resolve(body.results);
				} else {
					reject(err);
				}
			});

	});
	return result;
};

module.exports = api;