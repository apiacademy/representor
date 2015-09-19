/*******************************************************
 * todo-mvc implementation
 * json representor w/ URL profile (server)
 * June 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Complete Collection : B.B. King (2008)
 *******************************************************/

// json representor
// with profile=urls for NDC Oslo 2015
// strip out action info
module.exports = json;

function json(object) {
  var i, x;
  var actions;
    
  for (var p in object) {
    switch (p) {
    case "actions":
      delete object[p];
      break;
    //case "todo":
    default:
      actions = object[p].actions;
      
      if (object[p].data) {
        object[p] = object[p].data;
        delete object[p].data;
        
        // selected actions
        object.actions = {};
        for(i=0,x=actions.length;i<x;i++) {
          if(actions[i].name==="listAll") {
            object.actions.collection = actions[i].href;
          }
          if(actions[i].name==="listActive") {
            object.actions.active = actions[i].href+"?completed=false";
          }
          if(actions[i].name==="listCompleted") {
            object.actions.completed = actions[i].href+"?completed=true";
          }
        }

        // annotated data
        for(i=0,x=object[p].length;i<x;i++) {
          object[p][i].href = object[p][i].meta.href;
          delete object[p][i].meta;
        } 
      } 
      break;
    }
  }

  return JSON.stringify(object, null, 2);
}

// EOF

