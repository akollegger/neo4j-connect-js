'use strict';

var repl = require("repl");
var Neo4jConnect = require('../build/neo4j-connect');


module.exports = function(program) {

	program
		.command('shell')
		.version('0.0.1')
		.description('Interactive shell')
		.action(function(/* Args here */){
      var local = repl.start('(neo4j-connect) ');
      local.context.Neo4jConnect = Neo4jConnect;
		});

};
