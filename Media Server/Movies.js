'use strict';
const express = require('express');
const fs = require('fs');

const app = express();

const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = ' mongodb://MaVide:MaVide2018@ds145562.mlab.com:45562/videokanta';


module.exports = app;