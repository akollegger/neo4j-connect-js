(function() {
  var HttpOps, Neo4jConnect, Neo4jInfo, Neo4jUrl, Q,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Q = require('q');

  Neo4jUrl = require('neo4j-url');

  HttpOps = require('./http-ops');

  Neo4jInfo = require('./neo4j-info');

  module.exports = Neo4jConnect = (function(_super) {
    __extends(Neo4jConnect, _super);

    Neo4jConnect.VERSION = '0.1.0';

    function Neo4jConnect(url) {
      if (url == null) {
        url = "http://localhost:7474";
      }
      this.neo4jUrl = new Neo4jUrl(url);
      this.info = new Neo4jInfo(this.neo4jUrl);
    }

    Neo4jConnect.prototype.cypher = function(cyp) {
      var _this = this;
      return this.neo4jUrl.ready().then(function(neo4j) {
        return _this.post(neo4j.data.cypher, {
          query: cyp
        });
      });
    };

    Neo4jConnect.prototype.toString = function() {
      return "Neo4jConnect to " + this.neo4jUrl.url;
    };

    return Neo4jConnect;

  })(HttpOps);

}).call(this);
