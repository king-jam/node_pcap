var TLV = require("./lldp_tlv");

function LLDP(emitter) {
    this.emitter = emitter;
    this.chassisTLV = undefined;
    this.portIdTLV = undefined;
    this.ttlTLV = undefined;
    this.optionalTLVs = [];
    this.endTLV = undefined;
}

LLDP.prototype.decode = function (raw_packet, offset) {
    var originalOffset = offset;
    var currentTLVLength = (raw_packet[offset].readUInt16BE(offset, true) & 0x01ff);
    this.chassisTLV = new TLV(this.emitter).decode (raw_packet, offset);
    offset += currentTLVLength;
    currentTLVLength = (raw_packet[offset].readUInt16BE(offset, true) & 0x01ff);
    this.portIdTLV = new TLV(this.emitter).decode (raw_packet, offset);
    offset += currentTLVLength;
    currentTLVLength = (raw_packet[offset].readUInt16BE(offset, true) & 0x01ff);
    this.ttlTLV = new TLV(this.emitter).decode (raw_packet, offset);
    offset += currentTLVLength;
    while(raw_packet[offset].readUInt16BE(offset, true) != 0) {
        currentTLVLength = (raw_packet[offset].readUInt16BE(offset, true) & 0x01ff);
        this.optionalTLVs.push(new TLV(this.emitter).decode (raw_packet, offset));
        offset += currentTLVLength;
    }

    if(this.emitter) { this.emitter.emit("lldp", this); }
    return this;
}

LLDP.prototype.decoderName = "lldp";
LLDP.prototype.eventsOnDecode = true;

module.exports = LLDP;
