(function() {
  var Discoverable, Neo4jManagement, Q, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Discoverable = require('./discoverable');

  Q = require('q');

  _ = require('lodash');

  module.exports = Neo4jManagement = (function(_super) {
    __extends(Neo4jManagement, _super);

    function Neo4jManagement(promisedNeo4j) {
      var _this = this;
      promisedNeo4j.then(function(neo4j) {
        _this.url = neo4j.management;
        return _this.get().then(function(management) {
          return _.assign(_this, management);
        });
      });
    }

    return Neo4jManagement;

  })(Discoverable);

}).call(this);
