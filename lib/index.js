//Nick Mai

module.exports = function(server, options, next) {

	server.route({
	    method: 'GET',
	    path: '/methods/{name}/{args?}',
	    handler: function (request, reply) {
		       //request.params.name will give me the method name
		       //request.params.args may or may not exist

		       //args will have to be split by a different character


		       //check if method exists- if not, return 404

		       //method is to be completed within this scope
		       //will return error response if method returns an error


		       //namespaced server methods- what are these? will look into this
		       //sounds like this shouldn't concern me unless '.' is handled by something
		    }
		});

};