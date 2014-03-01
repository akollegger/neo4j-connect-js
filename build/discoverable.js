(function() {
  var Discoverable, Q, isBrowser, sa;

  isBrowser = typeof window !== "undefined" && window !== null;

  sa = isBrowser ? window.superagent : require('superagent');

  Q = require('q');

  module.exports = Discoverable = (function() {
    function Discoverable() {}

    Discoverable.prototype.url = '';

    Discoverable.prototype.resource = {};

    Discoverable.prototype.get = function() {
      var deferred;
      deferred = Q.defer();
      sa.get(this.url, function(res) {
        return deferred.resolve(res.body);
      });
      return deferred.promise;
    };

    return Discoverable;

  })();

}).call(this);
