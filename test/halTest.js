/** @see: http://chaijs.com/api/bdd/ **/

var assert = require("chai").assert;
var fh     = require("./support/fixture-helper.js");

describe('hal plugin tests (standard): ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("internal-representation.json");
  var internalObj = JSON.parse(internalString);

  var halStr = repserializer(internalObj, 'application/hal+json');
  var hal    = JSON.parse(halStr);

  it('selfLink link parsed', function() {
    assert(hal._links.selfLink.href === '//hyper-hackery.herokuapp.com/');
  });

  it('data parsed', function() {
    assert(hal.collection[0].id === '1b361exznny');
  });

});

describe('hal plugin tests (minimal): ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("internal-representation-min.json");
  var internalObj = JSON.parse(internalString);

  var halStr = repserializer(internalObj, 'application/hal+json');
  var hal    = JSON.parse(halStr);

  it('data entity was parsed properly', function() {
    assert(hal.collection[0].id === "1b361exznny");
  });

});

describe('hal plugin tests (nodebootstrap example): ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("nodebootstrap-example-internal.json");
  var internalObj = JSON.parse(internalString);

  var halStr = repserializer(internalObj, 'application/hal+json');
  var hal    = JSON.parse(halStr);

  it('self link parsed', function() {
    assert(hal._links.self.href === 'http://localhost:5001/users');
  });

  it('data parsed', function() {
    assert(hal.users[0].uuid === '5fc0a65e-c67a-4a15-811e-bd24e8e7ef5f');
  });

});
