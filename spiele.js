var traceur = require('traceur');

traceur.require.makeDefault(function(filename) {
  // transpile only application files
  var isApplicationFile = filename.indexOf('node_modules') === -1

  if(isApplicationFile) {
    console.log("->",filename)
  }
  return isApplicationFile;
});

/* Load app.js */
console.log("Loading app.js");
require("./app");

/* === see ===
 https://github.com/google/traceur-compiler/wiki/Using-Traceur-with-Node.js
*/

