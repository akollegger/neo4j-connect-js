(function() {
  var HttpOps, Neo4jInfo, Neo4jUrl, Q,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Q = require('q');

  Neo4jUrl = require('neo4j-url');

  HttpOps = require('./http-ops');

  module.exports = Neo4jInfo = (function(_super) {
    __extends(Neo4jInfo, _super);

    function Neo4jInfo(neo4jUrl) {
      var deferred_this,
        _this = this;
      this.neo4jUrl = neo4jUrl;
      deferred_this = Q.defer();
      this.promise = deferred_this.promise;
      this.neo4jUrl.ready().then(function(neo4jUrl) {
        _this.version = neo4jUrl.data.neo4j_version;
        return deferred_this.resolve(_this);
      });
    }

    Neo4jInfo.prototype.ready = function() {
      return this.promise;
    };

    Neo4jInfo.prototype.toString = function() {
      return "Neo4jInfo about " + this.neo4jUrl.url;
    };

    return Neo4jInfo;

  })(HttpOps);

}).call(this);
