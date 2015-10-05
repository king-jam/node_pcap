function IEEE_8021_PRIVATE() {
}

IEEE_8021_PRIVATE.prototype.decode = function (tlv, raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  tlv.orgSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;

  switch(tlv.orgSubType) {
    case 1:
      tlv.portVlanId = raw_packet.readUInt16BE(offset+1, true);
    case 2:
      tlv.portProtocolVlanId = undefined;
    case 3:
      tlv.vlanName = undefined;
    case 4:
      tlv.protocolId = undefined;
    case 8:
      tlv.congestionNotification = undefined;
    case 9:
      tlv.etsConfig = undefined;
    case 10:
      tlv.etcRec = undefined;
    case 11:
      tlv.flowControlConfig = undefined;
    case 12:
      tlv.appPriority = undefined;
    case 13:
      tlv.evb = undefined;
    case 14:
      tlv.cdcp = undefined;
    default:
      console.log("Unknown Organizational SubType!");
  }
}

module.exports = IEEE_8021_PRIVATE;
