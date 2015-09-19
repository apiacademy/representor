/** @see: http://chaijs.com/api/bdd/ **/

var expect = require("chai").expect;

describe('representor interface tests: ', function() {

  var repserializer = require('../representor.js'); 


  it('rejects if mime type is missing', function() {
    var fakeJSON = {};
    expect(repserializer.bind(repserializer, fakeJSON)).to.throw('Cannot serialize to an unspecified mime type.');
  });


  it('rejects unsupported mime types', function() {
    var fakeJSON = {};
    expect(repserializer.bind(repserializer, fakeJSON, 'app/nonexistant+json')).to.throw('Cannot serialize to an unsupported mime type: ');
  });

});