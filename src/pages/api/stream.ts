import { NextApiRequest, NextApiResponse } from "next";
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs";

export const config = {
	api: {
		responseLimit: '20mb',
	  },
}
		// THIS WHOLE FILE HAS TO BE TYPESCRIPTED PROPERLY !! //
export default function createStream(req: NextApiRequest, res: NextApiResponse){

	const regexPath = /path=(.*)&/;
	const regexImdb = /imdbCode=(.*?)&/;
	const regexSize = /size=(.*)/;
	let moviePath: any = req.url?.match(regexPath); // fix typescript
	moviePath = moviePath[1]?.split('%20').join(' ');
	const imdbCode: any = req.url?.match(regexImdb); // fix typescript
	const fullSize: any = req.url?.match(regexSize); // fix typescript
	const range = req.headers.range
	let notLoaded = false;

	if (!range) {
		res.status(404).send('Requires Range header');
	} else {
		const videoPath = `./movies/${imdbCode[1]}/${moviePath}`;
		const isMp4 = videoPath.endsWith('mp4');
		const videoSize = Number(fullSize[1])
		const CHUNK_SIZE = 20e+6;
		let start = Number(range.replace(/\D/g, ""));

		if (start > videoSize - 1) { // this might be useless after changes so propably will take away
			notLoaded = true;
			start = 0;
		}

		const end = isMp4 ? Math.min(start + CHUNK_SIZE, videoSize - 1) : videoSize - 1;
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

		if (notLoaded) {
			res.writeHead(416, headers);
		} else {
			res.writeHead(206, headers);
		}

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
