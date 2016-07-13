## EXPRESS ##

** HTTP STATUS CODES **

1xx Informational
 - 100 Continue
 - 101 Switching Protocols
 - 102 Processing
2xx Success
 - 200 OK
 - 201 Created
 - 202 Accepted
 - 203 Non-Authoritative Information (since HTTP/1.1)
 - 204 No Content
 - 205 Reset Content
 - 206 Partial Content (RFC 7233)
 - 207 Multi-Status (WebDAV; RFC 4918)
 - 208 Already Reported (WebDAV; RFC 5842)
 - 226 IM Used (RFC 3229)
3xx Redirection
 - 300 Multiple Choices
 - 301 Moved Permanently
 - 302 Found
 - 303 See Other (since HTTP/1.1)
 - 304 Not Modified (RFC 7232)
 - 305 Use Proxy (since HTTP/1.1)
 - 306 Switch Proxy
 - 307 Temporary Redirect (since HTTP/1.1)
 - 308 Permanent Redirect (RFC 7538)
4xx Client Error
 - 400 Bad Request
 - 401 Unauthorized (RFC 7235)
 - 402 Payment Required
 - 403 Forbidden
 - 404 Not Found
 - 405 Method Not Allowed
 - 406 Not Acceptable
 - 407 Proxy Authentication Required (RFC 7235)
 - 408 Request Timeout
 - 409 Conflict
 - 410 Gone
 - 411 Length Required
 - 412 Precondition Failed (RFC 7232)
 - 413 Payload Too Large (RFC 7231)
 - 414 URI Too Long (RFC 7231)
 - 415 Unsupported Media Type
 - 416 Range Not Satisfiable (RFC 7233)
 - 417 Expectation Failed
 - 418 I'm a teapot (RFC 2324)
 - 421 Misdirected Request (RFC 7540)
 - 422 Unprocessable Entity (WebDAV; RFC 4918)
 - 423 Locked (WebDAV; RFC 4918)
 - 424 Failed Dependency (WebDAV; RFC 4918)
 - 426 Upgrade Required
 - 428 Precondition Required (RFC 6585)
 - 429 Too Many Requests (RFC 6585)
 - 431 Request Header Fields Too Large (RFC 6585)
 - 451 Unavailable For Legal Reasons
5xx Server Error
 - 500 Internal Server Error
 - 501 Not Implemented
 - 502 Bad Gateway
 - 503 Service Unavailable
 - 504 Gateway Timeout
 - 505 HTTP Version Not Supported
 - 506 Variant Also Negotiates (RFC 2295)
 - 507 Insufficient Storage (WebDAV; RFC 4918)
 - 508 Loop Detected (WebDAV; RFC 5842)
 - 510 Not Extended (RFC 2774)
 - 511 Network Authentication Required (RFC 6585)

# FIRST STEPS

> What Express is:
 - A web application framework for Node
 - Minimal and flexible
 - Great for building Web APIs
 - Popular services built on Express
 - Foundation for other tools and frameworks

> Install using npm (node)
$ npm install --save express
$ npm install --save express@4.9 //if you want to specify the version

# HOW MIDDLEWARE WORKS

> Rich JavaScript Applications
 - They allow for a more interactive experience on the web.

 Client -> Initial Request        -> Server
 Client <- index.html is returned <- Server
 Client -> Ajax Requests          -> Server
 Client <- JSON is returned       <- Server

> It's possible to use:
 - angular
 - amber
 - backbone
 - jquery...

> Middleware
 - Functions executed sequentially that access request and response:

 Client    ->    Express
                 (Middleware: Validation)
                 (Middleware: Authentication)
                 (Middleware: Data Parsing)
 Client    <-    (Middleware: Routes)

 - You can use next() method to chain the middleware functions:
 app.use(function(request, response, next){
 	...
 	next();
 });

> Fetching a List of Blocks
 - Listing data from Express with AJAX calls

 Client -> Request to /    -> Server
 Client <- ............... <- Server
 Client -> Ajax to /blocks -> Server
 Client <- ............... <- Server

> The Node module (module.exports) system follows the CommonJS specification.

# READING FROM URL

> Request using query-search:
 - request.query.<queryParam>
  - limit
  - search

> Normalize teh request parameter
 - name[0].toUpperCase() + name.slice(1).toLowerCase(); //'Fixed'

# POST REQUESTS

> Install the body-parser
 - npm install --save body-parser

 var bodyParser = require('body-parser');
 var parseUrlencoded = bodyParser.urlencoded({extended: false});

 - extended: false // forces the use of native querystring Node library

> Routes can take multiple handlers as arguments and will call them sequentially
 - this way the anonymous function runs after parse handler

> POST request
 - app.post('/blocks', parseUrlencoded, function(req, resp) {

> DELETE request
 - app.delete('/blocks/:name', function(req, resp) {