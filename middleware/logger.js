// Logger middleware
module.exports = function(req, resp, next) {

	var start = +new Date(); // plus: converts date Object to milliseconds
	var stream = process.stdout;
	var url = req.url;
	var method = req.method;

	resp.on('finish', function(){
		var duration = +new Date() - start;
		var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
		stream.write(message);
	});

	next();
};