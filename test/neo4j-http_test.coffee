'use strict';

Neo4jConnect = require('../build/neo4j-connect');

describe 'Neo4jConnect has sensible defaults', () ->

  it 'should know the default URL for a localhost running Neo4j', () ->
    ic = new Neo4jConnect()
    ic.neo4jUrl.url.should.equal("http://localhost:7474")
