var express = require('express'),
	http = require('http'),
	app = express();

// Tell express to load any file in the public folder
app.use(express.static(__dirname + '/public'));

// Launch server
var server = app.listen(8100, function() {
	console.log('Listening on port %d', server.address().port);
});
