function TLV(emitter) {
	this.emitter = emitter;
	this.tlvType = undefined;
	this.tlvLength = undefined;
	this.payload = undefined;
}

TLV.prototype.decode = function (raw_packet, offset) {
	// https://en.wikipedia.org/wiki/Type-length-value
	// https://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol
  this.tlvType = ((raw_packet[offset].readUInt16BE & 0xfe00) >> 7)
  this.tlvLength = ((raw_packet[offset].readUint16BE & 0x01ff) >> 9);
  this.payload = new Buffer(tlvLength);
  this.payload.slice(raw_packet[offset+2],raw_packet[offset+tlvLength+2]);
  return this;
}

TLV.prototype.decoderName = "tlv";
TLV.prototype.eventsOnDecode = true;

module.exports = TLV;
