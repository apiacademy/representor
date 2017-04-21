/** @see: http://chaijs.com/api/bdd/ **/

var expect = require("chai").expect;

describe('representor interface tests: ', function() {

  var repserializer = require('../representor.js'); 


  it('rejects if mime type is missing', function() {
    var fakeJSON = {};
    expect(repserializer.bind(repserializer, fakeJSON)).to.throw('No destination mime type provided to Representor.');
  });


  it('rejects unsupported mime types', function() {
    var fakeJSON = {};
    expect(repserializer.bind(repserializer, fakeJSON, 'app/nonexistant+json')).to.throw('Representor cannot serialize to an unsupported mime type: ');
  });

});