var express = require("express");
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

// Mocked data
var blocks = {
	'Fixed': 'Fastened securely in position',
	'Movable': 'Capable of being moved',
	'Rotating': 'Moving in a circle around its center'
};

// Routes
router.route('/')
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

router.route('/:name')
	.all(function(req, resp, next){ // equivalent to app.param
		var name = req.params.name;
		var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
		req.blockName = block;
		console.log(block);
		next();
	})
	.get(function(req, resp) { // Find by name
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

// Expose Module
module.exports = router;