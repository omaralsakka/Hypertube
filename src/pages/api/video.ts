import { NextApiRequest, NextApiResponse } from "next";
import { downloadTorrent } from "../../server/torrent/downloadTorrent";
interface torrentDataInter { 
	url: string,
	hash: string,
	quality: string,
	type: string,
	seeds: number,
	peers: number,
	size: string,
	size_bytes: number,
	date_uploaded: string,
	date_uploaded_unix: number
};

const createMagnetLink = (torrents: torrentDataInter[], movieTitle: string): string => {
	let infoHash: torrentDataInter | string = torrents.reduce((curr , prev) => prev.size_bytes < curr.size_bytes ? prev : curr);
	infoHash = infoHash.hash;
	const magnetLink: string = encodeURI(`magnet:?xt=urn:btih:${infoHash}` + `&dn=${movieTitle}`);
	return magnetLink;
}

export default async function streamVideo(req: NextApiRequest, res: NextApiResponse) {
	console.log('in api endpoint')
	if(req.method === 'POST') {
		// here a check for if the movie has been already downloaded, if so skip the downloading :D
		const data = JSON.parse(req.body);
		const id: number = data.id;
		const imdbCode: string = data.imdb_code;
		const movieTitle: string = data.title_long;
		const torrents: torrentDataInter[] = data.torrents;
		const uri: string = createMagnetLink(torrents, movieTitle);
		await downloadTorrent(uri, imdbCode); // maybe pass imdb code here as well for the path of downloaded file.
		// if there is a issue when starting to view the movie it might have something to do with that it hasnt started downloading yet
		// before clicking play because i removed now the createStream from here.
		res.status(200).json({ message: 'Movie downloading'});
	} else {
		res.status(404).json({ message: 'Type of request invalid, please do a POST request'});
	}
}