//Nick Mai
//example server- will implement the 'add' method in the gist example

var Hapi = require('hapi');

//Configure the server
var server = new Hapi.Server();
server.connection({ port: 8080 });


//Display method usage on the root path
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('<h2>hapi-method-routes demo</h2>Usage: /methods/your_method/opt_arg1,opt_arg2,...');
    }
});


//Load all necessary plugins (in this case, just one)
server.register([require('..')], {}, function (err) {

	//Throw any errors
    if (err) {
        console.error('Failed to load a plugin:', err);
    }

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
