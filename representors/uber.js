/*******************************************************
 * Sep 2015
 * Irakli Nadareishvili (@inadarei)
 * Soundtrack : Philipp Dittberner & Marv - Wolke 4
 *******************************************************/

/**
 * 
  REFERENCE:
    http://uberhypermedia.org

  DEPENDS:
    - 

  HACKS:
    - 

  ISSUES:
    - 
*/

module.exports = uber;

// var urit = require('uritemplate');

// emit valid siren body
function uber(object) {
  
  var output         = {};
  var rootData       = [];
  
  output.uber = {};
  object      = object[Object.keys(object)[0]]; // removing extra layer regardless of what it's called.
  
  rootData = parseTitle(rootData, object);

  output.uber.version = "1.0";
  output.uber.data = rootData;
  
  var o;
  
  for(o in object.data) {
    rootData = parseDataValue(rootData, object.data[o]);
  }

  for(o in object.actions) {
    rootData = parseActions(rootData, object.actions[o]);
  }
  
  return JSON.stringify(output, null, 2);
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

/**
 * example:
 * { meta: { rel: [ 'item' ], href: '//localhost:8181/1b361exznny' },
    id: '1b361exznny',
    title: 'one more test again',
    completed: 'true' }
*/
function parseDataValue(rootData, obj) {
  
  var newElement = {};
  newElement.rel = obj.meta.rel;
  newElement.id  = obj.id;
  newElement.url = obj.meta.href;
  newElement.title = obj.title;
  newElement.data = [];
  
  // parse all free-form value objects  
  var knownProps = ["meta", "href", "id", "title", "meta", "prompt", "kind", "rel", "inputs", "name", "type"];  
  
  newElement = parseUnknownProperties(newElement, obj, knownProps);
  
  rootData[rootData.length] = newElement;
  
  return rootData;
}

// handle actions which can be links or forms
function parseActions(rootData, obj) {
  
  var newElement = {};
  
  if(typeof obj.inputs === "undefined" || obj.inputs.length===0) {
    newElement = parseLink(newElement, obj);
  } else {
    newElement = parseForm(newElement, obj);
  }
  
  // parse all free-form value objects  
  var knownProps = ["meta", "href", "id", "title", "meta", "prompt", "kind", "rel", "inputs", "name", "type"];  
  newElement = parseUnknownProperties(newElement, obj, knownProps);
  
  rootData[rootData.length] = newElement;  
  return rootData;
}

/**
* Example:
*    {"name": "selfLink",
      "type": "safe",
      "kind": "self",
      "target": "self",
      "prompt": "Reload",
      "href": "//hyper-hackery.herokuapp.com/",
      "rel": [
        "self"
      ]
    }
**/ 
function parseLink (uber, json) {
  uber.rel   = json.rel;
  uber.url  = json.href;
  uber.label = json.prompt;
  uber.name  = json.name;
  
  return uber;
}

/**
 * 
 * {
  "name": "addForm",
  "type": "unsafe",
  "kind": "todo",
  "target": "list",
  "prompt": "Add ToDo",
  "inputs": [
    {
      "name": "title",
      "prompt": "Title"
    },
    {
      "name": "completed",
      "prompt": "Complete",
      "value": "false"
    }
  ],
  "href": "//hyper-hackery.herokuapp.com/",
  "rel": [
    "create-form"
  ]
}
 * 
 * */
function parseForm (uber, json) {
  uber.name  = json.name || "";
  uber.url   = json.href || "";
  uber.rel   = json.rel || [];
  uber.label = json.prompt || "";
  
  if (json.type === "safe") {
    uber.action = "read";
  } else {
    uber.action = "append";
  }
  uber.label = json.prompt;
  
  if (!uber.data) { uber.data = []; }
  
  var modelMembers = [], currPos;
  for(var key in json.inputs) {
    //console.dir(json.inputs[key]);
    modelMembers[modelMembers.length] = json.inputs[key].name;

    currPos = uber.data.length;
    uber.data[currPos] = {
      name: json.inputs[key].name,
    };

    if (typeof json.inputs[key].prompt !== "undefined") {
      uber.data[currPos].prompt = json.inputs[key].prompt;
    }
    if (typeof json.inputs[key].value !== "undefined") {
      uber.data[currPos].value = json.inputs[key].value;
    }
  }
  
  uber.model = "{" + modelMembers.join(",") + "}";
  
  return uber;
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


// EOF