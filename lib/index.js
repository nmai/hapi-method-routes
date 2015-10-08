//Nick Mai

//@todo- error checking/logging is pretty poor, should be improved

//@todo- There shouldn't be any conflicts but I just remembered the 'util' module already exists. change this.
var util = require('./util');

module.exports = function(server, options, next) {
	//In the future: replace this with Hoek's applyToDefaults configurator
	//also, it would be a good idea to check and enforce the endpoint format (slashes must be in place)
	var endpoint;
	options.endpoint ? endpoint = options.endpoint : endpoint = '/methods/';

	server.route({
	    method: 'GET',
	    path: endpoint.concat('{name}/{args?}'),
	    handler: function (request, reply) {

			//check if method exists- if not, return 404
			var methodRef = util.depthTest(request.params.name, server.methods);
			if(typeof methodRef === 'undefined')
				reply('404- server method does not exist').code(404);
			

			//args is expected in JSON format
			//example: /methods/add/[3,4] will evaluate to methods.add(3,4)
			var args = [];
			if(typeof request.params.args !== 'undefined') {
				try{
			        args = JSON.parse(request.params.args);
			    }catch(e){
			        reply('Incorrect parameter format').code(400);
			    }
			}

			//Check if args is an array. JSON.parse could have changed this, although this is unlikely-
			//I probably need to do some custom parsing to convert the bracket URI representations
			//to actual bracket chars in order for the JSON parser to fully support JSON.
			if(!Array.isArray(args))
				args = [args];

			//create our result callback
			var resultCallback = function(err, result, cached, report) {
				if(err)
					reply(err.toString()).code(500);

				reply(result.toString());
			};

			//add the callback to the end of the argument array
			console.log(args.push(resultCallback));

			//invoke the server method. hopefully all is good.
			methodRef.apply(this, args);
	    }
	});

	next();
};
