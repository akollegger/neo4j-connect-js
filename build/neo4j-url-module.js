(function() {
  var Neo4jConnect, exports;

  Neo4jConnect = require('./neo4j-connect');

  if (typeof define === "function" && define.amd) {
    console.log("module view of Neo4jConnect:", Neo4jConnect);
    define(function(require, exports, module) {
      return Neo4jConnect;
    });
  } else if (typeof exports === "object") {
    exports = module.exports = function() {
      return Neo4jConnect;
    };
  }

  if (typeof window !== "undefined" && window !== null) {
    window.Neo4jConnect = Neo4jConnect;
  }

}).call(this);
