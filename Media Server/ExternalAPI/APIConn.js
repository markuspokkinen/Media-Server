const request = require('request');
const apiID_url = "https://api.themoviedb.org/3/movie/";
const apiKey = "?api_key=d6d6fca6e513373972e1653239fa2dc3";
const apiSearch_url = "https://api.themoviedb.org/3/search/movie/?api_key=d6d6fca6e513373972e1653239fa2dc3";
var api = {};

api.searchMovie = (dat) => {
	return new Promise((resolve, reject) => {
		//console.log(dat);
		request(apiSearch_url + "&query=" + dat, { json: true },
			(err, res, body) => {
				
				if (!err && res.statusCode === 200) {
					//console.log(body.results);
					resolve(body.results);
				} else {
					reject(err);
				}
			});

	});
};
api.OneMovie = (id) => {
	var res = new Promise((reso, reje) => {
		request(apiID_url + id + apiKey, { json: true },
			(err, res, body) => {
				if (!err && res.statusCode === 200) {
					reso(body);
				} else {
					reje(err);
				}
			});
	});
	return res;
};

module.exports = api;