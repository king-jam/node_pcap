var IPv4Addr = require("../ipv4_addr");

function managementAddress() {

}

managementAddress.prototype.decode = function(tlv, raw_packet, offset) {
	var addrStringLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	//http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
	var manSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	switch(manSubType) {
		case 1:
			tlv.mgmtAddress = new IPv4Addr().decode(raw_packet, offset).addr;
			break;
		default:
     			console.log("Management Address ID subType is reserved!");
	}

	//note: the management address string length includes one octet for the address subtype
	//address may also be a MAC address, to be implemented
	offset += addrStringLength;

	tlv.intSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	tlv.intNumber = raw_packet.toString("utf8", offset, offset+3);
	offset += 3;

	tlv.oidLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	tlv.oid = raw_packet.toString("utf8", offset, offset+tlv.oidLength);
};

module.exports = managementAddress;
