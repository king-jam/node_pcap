var orgs = require("./oui/oui_types");

function ORG() {
}

ORG.prototype.decode = function (tlv, raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  tlv.orgId = ((raw_packet.readUInt16BE(offset, true) << 8) || (raw_packet.readUInt16BE(offset+2, true) & 0xff00 >> 8));
  var OrgDecoderType = orgs[tlv.orgId];
  if(OrgDecoderType == undefined) {
    return;
  } else {
    var OrgDecoder = new OrgDecoderType();
    OrgDecoder().decode(tlv, raw_packet, offset+3);
  }
}

module.exports = ORG;
