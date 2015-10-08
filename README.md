# hapi-method-routes
a hapi plugin that exposes server methods via routes

## Available options:
* `endpoint`: must include trailing slash, i.e. '/methods/'

## Demo:
`npm install`
`node example/server.js`

Then try `localhost:8080/methods/hello` in your browser.
Alternatively, try `localhost:8080/methods/math.add/[1,6]`

## Example usage:
```js
var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port: 8080 });

server.register([{
		register: require('hapi-method-routes'), 
		options: {endpoint: '/methods/'}
	}], function (err) {

	//Throw any errors
    if (err)
        console.error('Failed to load a plugin:', err);

    //Create a method that returns 'Hello World!'
    server.method('hello', 
    	function (next) {
	    	next(null, 'Hello World!');
	    }, {});

    //Create a method that adds 2 numbers
    var add = function (x, y, next) {
	    next(null, x + y);
	};

    server.method('math.add', add, {});


    //Start the server
    server.start(function () {
	    console.log('Server running at:', server.info.uri);
	});

});
```