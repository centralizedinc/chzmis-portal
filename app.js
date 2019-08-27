'use strict'

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('view engine', 'html');

app.use('/assets', express.static(path.join(__dirname, './assets')));

module.exports = app;