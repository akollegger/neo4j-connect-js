(function() {
  var HttpOps, Q, isBrowser, sa;

  isBrowser = typeof window !== "undefined" && window !== null;

  sa = isBrowser ? window.superagent : require('superagent');

  Q = require('q');

  module.exports = HttpOps = (function() {
    function HttpOps() {}

    HttpOps.prototype.get = function(url) {
      var deferred;
      deferred = Q.defer();
      return sa.get(url, function(res) {
        return deferred.resolve(res.body);
      });
    };

    HttpOps.prototype.post = function(url, data) {
      var deferred;
      if (data == null) {
        data = {};
      }
      deferred = Q.defer();
      sa.post(url).send(data).set('Accept', 'application/json').set('Content-Type', 'application/json').end(function(res) {
        if (res.error) {
          return deferred.reject(res);
        } else {
          return deferred.resolve(res);
        }
      });
      return deferred.promise;
    };

    return HttpOps;

  })();

}).call(this);
