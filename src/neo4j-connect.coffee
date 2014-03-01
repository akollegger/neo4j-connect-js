
Q = require('q')

Neo4jUrl = require('neo4j-url')

HttpOps = require('./http-ops')
Neo4jInfo = require('./neo4j-info')


#
# Neo4jConnect
#
module.exports = class Neo4jConnect extends HttpOps

  # @property[String] Current version.
  @VERSION: '0.1.0'

  #
  # Constructs a new Neo4jConnect
  #
  #     var neo4j = new Neo4jConnect( "http://localhost:7474" )
  #
  # @param {String} base url for Neo4j
  constructor: (url = "http://localhost:7474") ->

    @neo4jUrl = new Neo4jUrl(url)

    @info = new Neo4jInfo(@neo4jUrl)

  cypher: (cyp) ->

    @neo4jUrl.ready()
      .then( (neo4j) =>
        @post(neo4j.data.cypher, {
          query: cyp
        })
      )


  toString: () ->
    return "Neo4jConnect to " + @neo4jUrl.url
