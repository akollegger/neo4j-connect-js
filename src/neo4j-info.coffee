
Q = require('q')

Neo4jUrl = require('neo4j-url')

HttpOps = require('./http-ops')

#
# Neo4jInfo
#
module.exports = class Neo4jInfo extends HttpOps

  #
  # Constructs a new Neo4jInfo
  #
  #     var info = new Neo4jInfo( neo4jUrl )
  #
  # @param {Neo4jUrl} discovery of Neo4j URLs
  constructor: (@neo4jUrl) ->
    deferred_this = Q.defer()
    @promise = deferred_this.promise

    @neo4jUrl.ready().then((neo4jUrl) =>
      @version = neo4jUrl.data.neo4j_version

      deferred_this.resolve(this)
    )

  ready: () ->
    return @promise


  toString: () ->
    return "Neo4jInfo about " + @neo4jUrl.url
