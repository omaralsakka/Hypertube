import { NextApiRequest, NextApiResponse } from 'next';
import { downloadTorrent } from '../../server/torrent/downloadTorrent';
import { downloadSubtitles } from '../../server/torrent/downloadSubtitles';
import { prisma } from '../../server/db/client';
import fs from 'fs';
interface torrentDataInter {
	url: string;
	hash: string;
	quality: string;
	type: string;
	seeds: number;
	peers: number;
	size: string;
	size_bytes: number;
	date_uploaded: string;
	date_uploaded_unix: number;
}

const createMagnetLink = (
	torrents: torrentDataInter[],
	movieTitle: string
): string => {
	let infoHash: torrentDataInter | string = torrents.reduce((curr, prev) =>
		prev.size_bytes < curr.size_bytes ? prev : curr
	);
	infoHash = infoHash.hash;
	const magnetLink: string = encodeURI(
		`magnet:?xt=urn:btih:${infoHash}` + `&dn=${movieTitle}`
	);
	return magnetLink;
};

export default async function streamVideo(
	req: NextApiRequest,
	res: NextApiResponse
) {

	if (req.method === 'POST') {
		let movieInfo: any = false; // fix typing
		let isMovieDownloaded: any; // fix typing
		const data = req.body;
		const id: number = data.id;
		const imdbCode: string = data.imdb_code;
		const movieTitle: string = data.title_long;
		const torrents: torrentDataInter[] = data.torrents;
		const uri: string = createMagnetLink(torrents, movieTitle);
		try {
			isMovieDownloaded = await prisma.movies.findFirst({
				where: { imdb_code: imdbCode },
			});
		} catch (error) {
			console.error(error);
		}
		if (!fs.existsSync(`./subtitles/${imdbCode}`)) // out of use for now because api limit is full
			downloadSubtitles(imdbCode);
		if (isMovieDownloaded === null || isMovieDownloaded.downloaded === 0) {
			try {
				movieInfo = await downloadTorrent(uri, imdbCode, isMovieDownloaded);
			} catch (error) {
				console.error(error);
			};
		} else {
			console.log('Movie has been already downloaded');
		};
		if (movieInfo !== false)
			res.status(200).json({ message: 'Movie downloading!', data: movieInfo });
		else
			res
				.status(200)
				.json({
					message: 'Preparing movie for streaming!',
					data: isMovieDownloaded,
				});
	} else {
		res
			.status(400)
			.json({ message: 'Type of request invalid, please do a POST request' });
	};
};
