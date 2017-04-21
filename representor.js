/*******************************************************
 * todo-mvc implementation based on ALPS doc
 * representation router (server)
 * May 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// load representors - moved down to strategy, to avoid unnecessary loading.

// demo formats for NDC Oslo 2015
// var jsonurls = require('./representors/jsonurls.js');
// var jsonforms = require('./representors/jsonforms.js');

module.exports = processDoc;

function processDoc(object, mimeType, root) {
  var doc;
  
  if (typeof root === 'undefined' || !root) {
    root = 'http://';
  }

  if (!mimeType) {
    throw new Error('No destination mime type provided to Representor.');
  }

  // dispatch to requested representor
  switch (mimeType.toLowerCase()) {
    case "application/json":
      var json = require('./representors/json.js');
      doc = json(object);
      break;
    case "application/vnd.collection+json":
      var cj = require('./representors/cj.js');
      doc = cj(object);
      break;
    case 'application/vnd.uber+json':
      var uber = require('./representors/uber.js');
      doc = uber(object);
      break;
    case "application/hal+json":
      var hal = require('./representors/halv2.js');
      doc = hal(object);
      break;
    case "application/vnd.hal+json": // legacy
      var haljson = require('./representors/haljson.js');
      doc = haljson(object, root);
      break;
    case "application/vnd.siren+json":
      var siren = require('./representors/siren.js');
      doc = siren(object);
      break;
    case "application/representor+json":
      var repjson = require('./representors/repjson.js');
      doc = repjson(object);
      break;

    // demo formats for NDC Oslo 2015  
    /** Irakli: not sure if Mike still needs these.
    case "application/json;profiles=urls":
      doc = jsonurls(object);
      break;
    case "application/json;profiles=forms":
      doc = jsonforms(object);
      break;
    **/  
      
    default:
      throw new Error('Representor cannot serialize to an unsupported mime type: ' + mimeType);
  }

  return doc;
}

// EOF

