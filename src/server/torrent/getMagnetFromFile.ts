import fs from 'fs';
import crypto from 'crypto';
import bencode from 'bencode';

export const createMagnet = (filepath: string) => {
	const torrentData = bencode.decode(fs.readFileSync(filepath));

	const infoHash: string = crypto.createHash('sha1').update(bencode.encode(torrentData.info)).digest('hex');

	let announceList: Buffer[] = [];

	announceList.push(...torrentData['announce-list'].map((ann: Buffer) => ann.toString('utf-8')))

	const trackers: string = announceList.join('&tr=');

	const uri: string = `magnet:?xt=urn:btih:${infoHash}` + `&dn=${torrentData.info.name}` + `&tr=${trackers}`;

	return uri;
};

console.log(createMagnet('test.torrent'));
