var TLV = require("./lldp_tlv");

function LLDP(emitter) {
    this.emitter = emitter;
    this.tlvArray = [];
}

LLDP.prototype.decode = function (raw_packet, offset) {
    while(raw_packet.readUInt16BE(offset, true) != 0) {
        currentTLVLength = (raw_packet.readUInt16BE(offset, true) & 0x01ff) + 2;
        this.tlvArray.push(new TLV(this.emitter).decode (raw_packet, offset));
        offset += currentTLVLength;
    }

    if(this.emitter) { this.emitter.emit("lldp", this); }
    return this;
}

LLDP.prototype.decoderName = "lldp";
LLDP.prototype.eventsOnDecode = true;

module.exports = LLDP;
