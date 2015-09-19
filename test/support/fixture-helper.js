var fixtures = require('path').join(__dirname, '../fixtures');

var fs = require('fs');

var exports = module.exports = {};

exports.loadFixture = function(name, cb) {
  var path = fixtures + "/" + name;

  return fs.readFileSync( path, "utf8");
};