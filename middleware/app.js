var express = require("express");
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// using a custom middleware, for a complex log solution:
// https://github.com/expressjs/morgan (allow write logs in file)
var logger = require("./logger");
app.use(logger);

/*app.get('/', function(req, resp) {
	resp.sendFile(__dirname + '/public/index.html');
});*/
// using the static files from public folder
app.use(express.static('public'));

var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

// List (optional: maxResults)
app.get('/blocks', function(req, resp) {
	if (req.query.limit >= 0) {
		resp.json(Object.keys(blocks).slice(0, req.query.limit));
	} else {
		resp.json(Object.keys(blocks));
	}
});

// Add
app.post('/blocks', parseUrlencoded, function(req, resp) {
	var newBlock = req.body;
	blocks[newBlock.name] = newBlock.description;	
	resp.status(201).json(newBlock.name); // HTTP 201: Created status
});

// Delete
app.delete('/blocks/:name', function(req, resp) {
	if (blocks[req.blockName]) {
		delete blocks[req.blockName];
		resp.sendStatus(200);
	} else {
		resp.sendStatus(404);
	}
});

// Find by name
app.get('/blocks/:name', function(req, resp) {
	//var name = req.params.name;
	//var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

	//var description = blocks[req.params.name]; // replaced by code above to ignore case sensitive
	//var description = blocks[block]; // replaced by app.param logic (req.param)
	var description = blocks[req.blockName];
	if (!description) { //undefined is setted as false
		resp.status(404).json('No description found for '+req.params.name);
	} else {
		resp.json(description);
	}
});

// application param to be used for other middlewares
app.param('name', function(req, resp, next){
	var name = req.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	req.blockName = block;
	next();
});

app.listen(3000, function() {
	console.log('Listening on port 3000...');
});