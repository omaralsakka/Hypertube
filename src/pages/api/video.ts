import { NextApiRequest, NextApiResponse } from "next";
import { downloadTorrent } from "../../server/torrent/downloadTorrent";
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs";

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

const startStream = (req: NextApiRequest, res: NextApiResponse, moviePath: string) => {
	const range = req.headers.range
	if (!range) {
		res.status(400).send('Requires Range header');
	} else {
		const videoPath = `${moviePath}`;
		const isMp4 = videoPath.endsWith('mp4');
		const videoSize = fs.statSync(`${moviePath}`).size;
		const CHUNK_SIZE = 10 ** 4; 
		const start = Number(range.replace(/\D/g, ""));
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1); // 
		const contentLength = end - start + 1;
		const headers = {
			"Content-Range": `bytes ${start}-${end}/${videoSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
		}
		res.writeHead(206, headers);
		const videoStream = fs.createReadStream(videoPath, { start, end });
		if (isMp4) {
			videoStream.pipe(res);
		} else {
		  ffmpeg(videoStream)
			.format('webm')
			.on('error', () => {})
			.pipe(res);
		}
	}
}

export default async function streamVideo(req: NextApiRequest, res: NextApiResponse) {
	const data = req.body;
	const id: number = data.id;
	const imdbCode: string = data.imdbCode;
	const movieTitle: string = data.titleLong;
	const torrents: torrentDataInter[] = data.torrents;
	const uri: string = createMagnetLink(torrents, movieTitle);
	const moviePath: string = `../../server/torrent/movies/${movieTitle}`; // THIS IS WRONG have to fix when player gets ready
	await downloadTorrent(uri); // maybe pass imdb code here as well for the path of downloaded file.
	startStream(req, res, moviePath);
	// res.status(200).json({ name: 'John Doe' })
}