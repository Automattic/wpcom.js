
/**
 * Module dependencies.
 */

var express = require('express');

express()
.use(express.static(__dirname + './../../dist'))
.use(express.static(__dirname))
.listen(3000);

console.log('wpcom app started on port 3000');
