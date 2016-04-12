/** @see: http://chaijs.com/api/bdd/ **/

var expect = require("chai").expect;
var fh     = require("./support/fixture-helper.js");

describe('uber plugin tests: ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("internal-representation.json");
  var internalObj = JSON.parse(internalString);

  var uberStr = repserializer(internalObj, 'application/vnd.uber+json');
  var uber    = JSON.parse(uberStr);

  it('title was parsed properly', function() {
    expect(uber.uber.data[0].name).to.equal("title");
    expect(uber.uber.data[0].id).to.equal("title");
    expect(uber.uber.data[0].value).to.equal("ToDo");
  });

  it('data entity was parsed properly', function() {
    expect(uber.uber.data[1].rel[0]).to.equal("item");
    expect(uber.uber.data[1].id).to.equal("1b361exznny");
    expect(uber.uber.data[1].url).to.equal("//hyper-hackery.herokuapp.com/1b361exznny");
  });

  it('must ignore test for data entity was parsed properly', function() {
    expect(uber.uber.data[1].data[0].name).to.equal("completed");
  });

  it('link element was parsed properly', function() {
    expect(uber.uber.data[4].rel[0]).to.equal("collection");
    expect(uber.uber.data[4].label).to.equal("All ToDo");
    expect(uber.uber.data[4].url).to.equal("//hyper-hackery.herokuapp.com/all-to-do");
  });

/*
{ name: 'listActive',
action: 'read',
label: 'Active ToDos',
data:
 [ { name: 'completed', prompt: 'Complete', value: 'false' },
   { name: 'target', value: 'list' } ],
model: '{completed}' }
*/
  it('form element was parsed properly', function() {
    expect(uber.uber.data[5].rel[0]).to.equal("active");
    expect(uber.uber.data[5].rel[1]).to.equal("collection");
    expect(uber.uber.data[5].action).to.equal("read");
    expect(uber.uber.data[5].model).to.equal("{completed}");
    expect(uber.uber.data[5].data[1].name).to.equal("target");
  });

});

describe('uber plugin tests (minimal): ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("internal-representation-min.json");
  var internalObj = JSON.parse(internalString);

  var uberStr = repserializer(internalObj, 'application/vnd.uber+json');
  var uber    = JSON.parse(uberStr);

  it('data entity was parsed properly', function() {
    expect(uber.uber.data[0].id).to.equal("1b361exznny");
    expect(uber.uber.data[0].title).to.equal("minimal test");
  });

});

describe('uber plugin tests (nested): ', function() {

  var repserializer = require('../representor.js');
  var internalString = fh.loadFixture("internal-representation-nested.json");
  var internalObj = JSON.parse(internalString);

  var uberStr = repserializer(internalObj, 'application/vnd.uber+json');
  var uber    = JSON.parse(uberStr);

   var util = require('util');
   console.log(util.inspect(uber, false, null));

  it('data entity was parsed properly', function() {
    expect(uber.uber.data[0].data[1].name).to.equal("somelist");
    expect(uber.uber.data[0].data[1].data[0].name).to.equal("uuid");
    // expect(uber.uber.data[0].title).to.equal("minimal test");
  });

});

