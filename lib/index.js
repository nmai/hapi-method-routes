//Nick Mai
var util = require('./util');

module.exports = function(server, options, next) {
	var endpoint;
	if(options.endpoint)
		endpoint = options.endpoint

	server.route({
	    method: 'GET',
	    path: '/methods/{name}/{args?}',
	    handler: function (request, reply) {
				//request.params.name will give me the method name
				//request.params.args may or may not exist


				//check if method exists- if not, return 404

				var methodRef = util.depthTest(request.params.name, server.methods);
				if(methodRef)
					reply('Found method');
				else
					reply('Could not find method');


				//args will have to be split by a different character


				//method is to be completed within this scope
				//will return error response if method returns an error


				//namespaced server methods- what are these? will look into this
				//sounds like this shouldn't concern me unless '.' is handled by something
		    }
		});

	next();
};
