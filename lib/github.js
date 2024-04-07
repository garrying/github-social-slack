/**
 * Module dependencies.
 */

var get = require("./request").get;
var moment = require("moment");
var _ = require("lodash");

/**
 * Get all events starting from (optional) startAt
 */

exports.events = function* (startAt) {
  var uri =
    "https://api.github.com/users/" +
    process.env.GITHUB_USER +
    "/received_events/public";
  var res = yield get(uri, process.env.GITHUB_TOKEN);
  var e = res.body;
  if (!startAt) return _(e).reverse().__wrapped__;
  return _.dropRightWhile(e, function (n) {
    return moment(startAt).isAfter(n.created_at);
  }).reverse();
};
