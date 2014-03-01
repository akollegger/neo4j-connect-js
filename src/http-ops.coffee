isBrowser = window?

sa = if isBrowser then window.superagent else require('superagent')
Q = require('q')

#
# HttpOps - promising http operations
#
module.exports = class HttpOps

  get: (url) ->
    deferred = Q.defer()

    sa.get(url, (res) ->
      deferred.resolve(res.body)
    )

  post: (url, data = {}) ->
    deferred = Q.defer()

    sa
      .post(url)
      .send(data)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end( (res) ->
        if (res.error)
          deferred.reject(res)
        else
          deferred.resolve(res)

      )

    return deferred.promise
