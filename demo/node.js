var Neo4jHttp = require('../dist/neo4j-http');

console.log('Neo4jHttp version:', Neo4jHttp.VERSION);

var localNeo4j = new Neo4jHttp();

// console.log('Neo4j version is: ' + localNeo4j.data().neo4j_version);