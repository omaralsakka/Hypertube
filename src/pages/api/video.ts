import { NextApiRequest, NextApiResponse } from 'next';
import { downloadTorrent } from '../../server/torrent/downloadTorrent';
import { downloadSubtitles } from '../../server/torrent/downloadSubtitles';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
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

	const session = await unstable_getServerSession(req, res, authOptions)

	if(session) {
		if (req.method === 'POST') {
			let movieInfo: any = false;
			let isMovieDownloaded: any;
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
			if (!fs.existsSync(`./subtitles/${imdbCode}`))
				downloadSubtitles(imdbCode);
			if (isMovieDownloaded === null /* || isMovieDownloaded.downloaded === 0 */) {
				 // I am thinking about to remove this ||or condition.
				 // Will start multiple downloads of same movie if not downloaded and user decides to stream after refresh or leaving page.
				 // Downside is that if the server would 'go down' and the movie is not fully downloaded, it wont ever restart to download the movie
				 // and we the result would be a partially loaded file.
				try {
					movieInfo = await downloadTorrent(uri, imdbCode, isMovieDownloaded);
				} catch (error) {
					console.error(error);
				};
			} else {
				console.log('Movie has been already downloaded'); // this can be removed when everything is ready
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
				.status(200) // this is stupid, but only here to prevent error in console.log
				.json( 'Unauthorized access' );
		};
	} else {
		res
			.status(200) // this is stupid, but only here to prevent error in console.log
			.json( 'Unauthorized access' );
	}
};
