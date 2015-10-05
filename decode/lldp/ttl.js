function ttl() {
	this.ttl = undefined;	
}

chassisId.prototype.decode = function(tlv, raw_packet, offset) {
	this.ttl = raw_packet.readUInt16BE(offset+1, true);
}

module.exports = ttl;