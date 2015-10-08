//Nick Mai

/* 	depthTest will return undefined if any nested property doesn't exist.
	If everything checks out, you will get a reference to the object desired.
	'name' is a string, like 'math.add'
	'context' is the immediate parent of the object in question
	Big thanks to http://stackoverflow.com/a/2631521/1146881
*/
exports.depthTest = function(name, context) {
    name= name.split('.')
    var obj= context[name.shift()];
    while(obj && name.length) obj= obj[name.shift()];
    return obj;
};