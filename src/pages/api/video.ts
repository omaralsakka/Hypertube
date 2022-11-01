import { NextApiRequest, NextApiResponse } from "next";
import { downloadTorrent } from "../../server/torrent/downloadTorrent";
import { prisma } from '../../server/db/client';

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
	console.log('in api/video endpoint')

	let movieInfo: any = false;

	if(req.method === 'POST') {
		const data = req.body;
		const id: number = data.id;
		const imdbCode: string = data.imdb_code;
		const movieTitle: string = data.title_long;
		const torrents: torrentDataInter[] = data.torrents;
		const uri: string = createMagnetLink(torrents, movieTitle);
		const isMovieDownloaded = await prisma.movies.findFirst({
			where: { imdb_code: imdbCode },
		});
		if(isMovieDownloaded === null){
			movieInfo = await downloadTorrent(uri, imdbCode);
		} else {
			console.log('Movie has been already downloaded') // this does not necessarely meen that the whole movie has been 
															// downloaded. Have to add this check to table.
		}
		if(movieInfo !== false)
			res.status(200).json({ message: 'Movie downloading!', data: movieInfo});
		else
			res.status(200).json({ message: 'Preparing movie for streaming!', data: isMovieDownloaded});
	} else {
		res.status(404).json({ message: 'Type of request invalid, please do a POST request'});
	}
}