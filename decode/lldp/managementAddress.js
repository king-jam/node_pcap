function managementAddress() {

}

managementAddress.prototype.decode = function(tlv, raw_packet, offset) {
	var addrStringLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	//http://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
	var manSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	//the management address string length includes one octet for the address subtype
	tlv.mgmtAddress = raw_packet.toString('utf8', offset, offset+addrStringLength);
	offset += addrStringLength;

	var intSubType = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	var intNumber = raw_packet.toString('utf8', offset, offset+3);
	offset += 3;

	var oidLength = (raw_packet.readUInt16BE(offset, true) & 0xff00) >> 8;
	offset++;

	tlv.oid = raw_packet.toString('utf8', offset, offset+oidLength);

	/*switch(manSubType) {
		case 1:

			break;
		default:
     		console.log("Management Address ID subType is reserved!")
	}*/
}

module.exports = managementAddress;
