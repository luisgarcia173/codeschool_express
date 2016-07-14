var express = require("express");
var app = express();

// using a custom middleware, for a complex log solution:
// https://github.com/expressjs/morgan (allow write logs in file)
var logger = require("./logger");
app.use(logger);

/*app.get('/', function(req, resp) {
	resp.sendFile(__dirname + '/public/index.html');
});*/
// using the static files from public folder
app.use(express.static('public'));

var blocks = require('./routes/blocks.js');
app.use('/blocks', blocks);

/* Moved to ./routes/blocks.js
// Refactoring routes to reuse the prefix as chaining
app.route('/blocks')
	.get(function(req, resp) { // List (optional: maxResults)
		if (req.query.limit >= 0) {
			resp.json(Object.keys(blocks).slice(0, req.query.limit));
		} else {
			resp.json(Object.keys(blocks));
		}
	})
	.post(parseUrlencoded, function(req, resp) { // Add new
		var newBlock = req.body;
		blocks[newBlock.name] = newBlock.description;	
		resp.status(201).json(newBlock.name); // HTTP 201: Created status
	});


app.route('/blocks/:name')
	.get(function(req, resp) { // Find by name
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
	})
	.delete(function(req, resp) { // Delete
		if (blocks[req.blockName]) {
			delete blocks[req.blockName];
			resp.sendStatus(200);
		} else {
			resp.sendStatus(404);
		}
	});

// application param to be used for other middlewares
app.param('name', function(req, resp, next){
	var name = req.params.name;
	var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
	req.blockName = block;
	next();
});*/

app.listen(3000, function() {
	console.log('Listening on port 3000...');
});