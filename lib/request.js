
/**
 * Module dependencies.
 */

var request = require('superagent');

/**
 * Thunkified post.
 */

exports.post = function(uri, body) {
  return function(fn) {
    request
      .post(uri)
      .send(body)
      .end(fn);
  };
};

/**
 * Thunkified get.
 */

exports.get = function(uri, token) {
  return function(fn) {
    request
      .get(uri)
      .set('Authorization', `token ${token}`)
      .end(fn);
  };
};
