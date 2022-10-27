import fs from 'fs';
import crypto from 'crypto';
import bencode from 'bencode';
import { downloadTorrent } from './downloadTorrent';

export const createMagnet = (filepath: string): string => {
	const torrentData = bencode.decode(fs.readFileSync(filepath));

	const infoHash: string = crypto.createHash('sha1').update(bencode.encode(torrentData.info)).digest('hex');

	let announceList: Buffer[] = [];
	let trackers: string;
	let dataName: string = torrentData.info.name;
	
	if('announce-list' in torrentData && Array.isArray(torrentData['announce-list'])) {
		announceList.push(...torrentData['announce-list'].map((ann) => ann.toString('utf-8')))
		trackers = announceList.join('&tr=');
	} else {
		trackers = torrentData.announce;
	}

	const uri: string = encodeURI(`magnet:?xt=urn:btih:${infoHash}` + `&dn=${dataName}` + `&tr=${trackers}`);

	return uri;
};
