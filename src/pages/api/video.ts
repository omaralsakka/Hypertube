import { NextApiRequest, NextApiResponse } from 'next';
import { downloadTorrent } from '../../server/torrent/downloadTorrent';
import { prisma } from '../../server/db/client';
import { Prisma } from '@prisma/client';
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
	console.log('in api/video endpoint');

	let movieInfo: any = false;

	if (req.method === 'POST') {
		const data = req.body;
		const id: number = data.id;
		const imdbCode: string = data.imdb_code;
		const movieTitle: string = data.title_long;
		const torrents: torrentDataInter[] = data.torrents;
		const uri: string = createMagnetLink(torrents, movieTitle);
		const isMovieDownloaded = await prisma.movies.findFirst({
			where: { imdb_code: imdbCode },
		});
		addMovies();
		if (isMovieDownloaded === null) {
			movieInfo = await downloadTorrent(uri, imdbCode);
		} else {
			console.log('Movie has been already downloaded'); // this does not necessarely mean that the whole movie has been
			// downloaded. Have to add this check to table.
			// we could pass the size of the partially downloaded file
			// to the download function above and compare it there
			// with the file size to be downloaded and if the dont match
			// continue downloading
		}

		if (movieInfo !== false)
			res.status(200).json({ message: 'Movie downloading!', data: movieInfo });
		else
			res.status(200).json({
				message: 'Preparing movie for streaming!',
				data: isMovieDownloaded,
			});
	} else {
		res
			.status(404)
			.json({ message: 'Type of request invalid, please do a POST request' });
	}
}

const addMovies = async () => {
	// console.log(data);
	for (const element of data.data.movies) {
		console.log(element);
		// const newMovie = await prisma.movie.upsert({
		// 	where: {
		// 		id: element.id,
		// 	},
		// 	update: {},
		// 	create: {
		// 		title: 'blaa',
		// 	} as Prisma.MovieCreateInput,
		const newMovie = await prisma.movie.create({
			data: element as Prisma.MovieCreateInput,
		});
	}
};

// const newUser = await ctx.prisma.user.upsert({
// 	where: {
// 		email: input.email,
// 	},
// 	update: {},
// 	create: {
// 		name: input.name,
// 		email: input.email,
// 		password: hashedPassword
// 	} as Prisma.UserCreateInput,
// });
