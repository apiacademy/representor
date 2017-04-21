/*******************************************************
 * Apr 2017
 * Irakli Nadareishvili (@inadarei)
 * Soundtrack : Tish Hyman - Subway Art
 *******************************************************/

/**
 *
  REFERENCE:
    http://uberhypermedia.org
*
*/

var _ = require('lodash');

module.exports = hal;

// var urit = require('uritemplate');

// emit valid hal body
var hal = function(object) {

  // Are they using the "root" element? It is not mandatory but is supported
  // for backwards-compatibility
  if (Object.keys(object).length !==1 || 
      Object.keys(object)[0] in ["data", "actions", "title"]
     ) {
    var object2 = {};
    object2.root = object;
    object = object2;
  }

  var rootData       = {};

  object      = object[Object.keys(object)[0]]; // removing extra layer regardless of what it's called.

  //rootData = parseTitle(rootData, object);
  if (object.actions) {
    parseActions(rootData, object.actions);
  }
  if (object.data) {
    parseDataValue(rootData, object.data);
  }
  

  return JSON.stringify(rootData, null, 2);
};

function parseDataValue(rootData, obj) {
  var dataIsArray = Array.isArray(obj);

  if (dataIsArray) { 
    rootData.collection = obj;
  } else {
    for (var prop in obj) {
      rootData[prop] = obj[prop];
    }
  }
}

 // handle actions which can be links or forms
 function parseActions(rootData, obj) {

  if (!Array.isArray(obj)) {
    throw new Error("Actions property must be an array");
  }

  rootData._links = {};

  for (var i=0; i<obj.length; i++) {
    if (isFormElement(obj[i])) {
      continue;
    }

    rootData._links[obj[i].name] = {};
    rootData._links[obj[i].name].href = obj[i].href;
  }
 
   // parse all free-form value objects
   //var knownProps = ["meta", "href", "id", "title", "prompt", "kind", "rel", "inputs", "name", "type"];  
   //newElement = parseUnknownProperties(newElement, obj, knownProps);
 }

function isFormElement(obj) {
   if (typeof obj.inputs === "undefined" || obj.inputs.length===0) {
     return false;
   } 
   return true;
}

/**
 * Implementationof MUST IGNORE: properties we don't know we just add as data elements, because UBER
 */
function parseUnknownProperties(obj, objToParse, knownProps) {

  if (!obj.data) { obj.data = []; }

  for(var o in objToParse) {
    if (knownProps.indexOf(o) === -1) {
      var tempObj = {};
      tempObj.name = o;
      tempObj.value = objToParse[o];
      obj.data[obj.data.length] = tempObj;
    }
  }

  return obj;
}

function parseTitle(rootData, object) {
  if (object.title && object.title.length > 0) {
    var newElement = {};
    newElement.name = newElement.id = "title";
    newElement.value = object.title;
    rootData[rootData.length] = newElement;
  }

  return rootData;
}

module.exports = hal;

// EOF
