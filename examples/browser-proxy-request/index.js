
/**
 * Module dependencies.
 */

var express = require('express');

var app = express();
app.use(express.static(__dirname + './../../dist'));
app.use(express.static(__dirname));

var port = 80;
app.listen(port);
console.log('wpcom app started on port %s', port);
