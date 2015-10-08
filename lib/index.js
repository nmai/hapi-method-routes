//Nick Mai
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


				//method is to be completed within this scope
				//will return error response if method returns an error


				//namespaced server methods- what are these? will look into this
				//sounds like this shouldn't concern me unless '.' is handled by something
		    }
		});

	next();
};
