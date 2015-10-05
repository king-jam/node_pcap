var types = new Array(128);

module.exports = types;

function init(){
  types[0] = undefined;
  types[1] = require("./chassisId");
  types[2] = require("./portId");
  types[3] = require("./ttl");
  types[4] = require("./portDescription");
  types[5] = require("./systemName");
  types[6] = require("./systemDescription");
  types[7] = require("./systemCaps");
  types[8] = require("./managementAddress");
  types[127] = require("./organization");
}
init();
