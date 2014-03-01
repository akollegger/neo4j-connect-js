(function() {
  var Discoverable, Neo4jData, Neo4jManagement, Neo4jConnect, Q,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Q = require('q');

  Discoverable = require('./discoverable');

  Neo4jData = require('./neo4j-data');

  Neo4jManagement = require('./neo4j-management');

  module.exports = Neo4jConnect = (function(_super) {
    __extends(Neo4jConnect, _super);

    Neo4jConnect.VERSION = '0.1.0';

    function Neo4jConnect(url) {
      var deferred_resource,
        _this = this;
      if (url == null) {
        url = "http://localhost:7474";
      }
      this.url = url;
      deferred_resource = Q.defer();
      this.data = new Neo4jData(deferred_resource.promise);
      this.management = new Neo4jManagement(deferred_resource.promise);
      this.get().then(function(neo4j) {
        return deferred_resource.resolve(neo4j);
      });
    }

    Neo4jConnect.prototype.toString = function() {
      return "Neo4jConnect " + " addressing " + this.url;
    };

    return Neo4jConnect;

  })(Discoverable);

}).call(this);
