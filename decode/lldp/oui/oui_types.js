var ouis = {};

module.exports = oui_types;

var oui_ieee_8021_private = 0x0080c2;
var oui_ieee_8023_private = 0x00120f;

function init(){
  ouis[oui_ieee_8021_private] = require("./8021_private");
  //ouis[oui_ieee_8023_private] = require("./8023_private");
  ouis[oui_ieee_8023_private] = undefined;
}
init();
