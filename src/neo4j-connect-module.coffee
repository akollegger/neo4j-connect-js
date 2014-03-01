# 'use strict'

# entry point for client (web-browser)

Neo4jConnect = require('./neo4j-connect')

if typeof define is "function" and define.amd
  # AMD
  console.log("module view of Neo4jConnect:", Neo4jConnect)
  define (require, exports, module) ->
    Neo4jConnect
else if typeof exports is "object"
  # CommonJS
  exports = module.exports = () ->
    Neo4jConnect

if window?
  # Browser globals (neo4jApi is your global library identifier)
  window.Neo4jConnect = Neo4jConnect
