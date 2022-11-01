import { NextApiRequest, NextApiResponse } from "next";
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs";

export default function createStream(req: NextApiRequest, res: NextApiResponse){

	const regexPath = /path=(.*)/;
	let moviePath: any = req.url?.match(regexPath); // fix typescript
	moviePath = moviePath[1]?.split('%20').join(' ');
	const regexImdb = /imdbCode=(.*?)&/;
	const imdbCode: any = req.url?.match(regexImdb); // fix typescript
	const range = req.headers.range
	if (!range) { // this whole if check might have to be removed and the 'no range' issue will be dealt in a different manor.
		res.status(416).send('Requires Range header');
	} else {
		console.log('this is range : ', range);
		const videoPath = `./movies/${imdbCode[1]}/${moviePath}`; // this might be wrong
		const isMp4 = videoPath.endsWith('mp4');
		const videoSize = fs.statSync(`${videoPath}`).size;
		console.log('THIS IS BIDEO SIZE',videoSize);
		const CHUNK_SIZE = 10 ** 6; 
		const start = Number(range.replace(/\D/g, ""));
		const end = Math.min(start + CHUNK_SIZE, videoSize - 1); // 
		const contentLength = end - start + 1;
		const headers = isMp4
			? {
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': contentLength,
			'Content-Type': 'video/mp4',
			}
			: {
			'Content-Range': `bytes ${start}-${end}/${videoSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Type': 'video/webm',
			};
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