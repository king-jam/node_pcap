function TLV(emitter) {
	this.emitter = emitter;
	this.tlvType = undefined;
	this.tlvLength = undefined;
	this.payload = undefined;
}

TLV.prototype.decode = function (raw_packet, offset) {
  // https://en.wikipedia.org/wiki/Type-length-value
  // https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  this.tlvType = (raw_packet.readUInt16BE(offset, true) & 0xfe00) >> 9;
  this.tlvLength = (raw_packet.readUInt16BE(offset, true) & 0x01ff);
  this.payload = new Buffer(this.tlvLength);
  this.payload.slice(raw_packet[offset+2],raw_packet[offset+this.tlvLength+2]);
  return this;
}

TLV.prototype.decoderName = "tlv";
TLV.prototype.eventsOnDecode = true;

module.exports = TLV;
