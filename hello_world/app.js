var express = require("express");
var app = express();

app.get('/', function(req, resp) {
	// using express
	resp.send('Hello World!');
	// using node 
	/*resp.write('Hello World!');
	resp.end();*/
});

// response in json format
app.get('/blocks', function(req, resp) {
	var blocks = ['Fixed', 'Movable', 'Rotating'];
	resp.send(blocks);
	//resp.json(blocks); //same result than above
});

// response in html format
app.get('/slices', function(req, resp) {
	var blocks = '<ul><li>Fixed</li><li>Movable</li><li>Rotating</li></ul>';
	resp.send(blocks);
});

// uses HTTP 302 (Move Temporarily) to show a page movimentation
app.get('/move', function(req, resp) {
	resp.redirect('/parts');
	//resp.redirect(301, '/parts'); // optional, you can add the HTTP code as 301 (Move Permanently)
});

app.get('/parts', function(req, resp) {
	resp.send('Redirected from /move to /parts');
});

app.listen(3000, function() {
	console.log('Listening on port 3000...');
});