function IEEE_8021_PRIVATE() {
	this.orgSubType = undefined;
  this.payload = undefined;
}

IEEE_8021_PRIVATE.prototype.decode = function (raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  this.orgSubType = (raw_packet.readUInt16BE(offset, true) & 0x00ff);
  var OrgDecoder = orgs[this.orgId];
  if(OrgDecoder == undefined) {
    this.payload = "Unknown";
  } else {
    this.payload = new OrgDecoder().decode(raw_packet, offset+3);
  }

  return this;
}

module.exports = IEEE_8021_PRIVATE;
