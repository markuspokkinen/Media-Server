'use strict';
var express = require('express');
const fs = require('fs');

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = ' mongodb://MaVidePost:MaVidePost2018@ds145562.mlab.com:45562/videokanta';
const app = express();
var numStreams = 0;

app.get("/file", function (req, res) {
	console.log(req.query);
	var file = req.query.file;
	if (file === '') {
		file = "F:\\TV Series\\24\\Season 09 (2014-)\\24S09E01-11.00a.m.12.00p.m.(720p)-02.05.2014.mp4";
	}
	//console.log(file);
	const range = req.headers.range;
	console.log(range);
	const stats = fs.statSync(file);
	//console.log(stats);
	let file_size = stats.size;

	if (range) {
		var positions = range.replace(/bytes=/, '').split('-');
		//console.log(positions);
		var start = parseInt(positions[0], 10);
		//console.log(start);
		let end = positions[1]
			? parseInt(positions[1], 10)
			: file_size - 1;
		let chunksize = (end - start) + 1;
		let stream = fs.createReadStream(file, { start, end });
		stream.setMaxListeners(5);
		let head = {
			'Content-Range': 'bytes ' + start + '-' + end + '/' + file_size,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4'
		};
		res.writeHead(206, head);
		stream.on('open', function () {
			numStreams++;
			console.log("open Number Of Streams: " + numStreams);
			stream.pipe(res);
		});
		stream.on('close', function () {
			numStreams--;
			console.log("close Number Of Streams: " + numStreams);
			stream.close();
			stream.unpipe();
			stream = null;
		});
		
	} else {
		const head = {
			'Content-Length': file_size,
			'Content-Type': 'video/mp4'
		};
		res.writeHead(200, head);
		fs.createReadStream(file).pipe(res);
	}

	
	

});

app.post("/", function (req, res) {
	console.log(req.body);
	MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, database) => {
		if (err) throw err;
		var kanta = database.db("videokanta");
		var collec = kanta.collection("TV_Sarjat");

		database.close();
	});
});
function newShow(collec) {

	collec.findOneAndUpdate(
		{ Show: req.body.Show },
		{
			$set: {
				Show: req.body.Show,
				Api_Url: req.body.Api_Url,
				LocImage: req.body.LocImage,
				ApiImage: req.body.ApiImage,
				Seasons: { Season: req.body.season, Episodes: { Episode_number: req.body.EpisodeNum, EpisodeName: req.body.EpisodeName, Address: req.body.fileLocation } }
			}
		}, { upsert: true },
		function (error, mres) {
			if (error) {
				//database.close();
				return error;
			} else {
				//database.close();
				return mres;
			}
		}
	);
}
function newSeason() {

}
function newEpisode() {

}
function updateEpisode() {

}
module.exports = app;