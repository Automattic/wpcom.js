
/**
 * Module dependencies.
 */

var express = require('express');

// setup middleware

var app = express();
var pub = __dirname + '/public';
app.use(express.static(pub));

app.set('views', __dirname + '/');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index');
});

app.listen(80);
console.log('wpcom app started on port 3000');
