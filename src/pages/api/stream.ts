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
	let notLoaded = false;
	if (!range) {
		res.status(404).send('Requires Range header');
	} else {
		console.log('this is range : ', range);
		const videoPath = `./movies/${imdbCode[1]}/${moviePath}`; // this might be wrong
		const isMp4 = videoPath.endsWith('mp4');
		const videoSize = fs.statSync(`${videoPath}`).size;
		const CHUNK_SIZE = 10 ** 6;
		let start = Number(range.replace(/\D/g, ""));
		if (start > videoSize - 1) {
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
// /api/stream?imdbCode=tt18082758&path=The%20Takeover%20(2022)%20[720p]%20[WEBRip]%20[YTS.MX]/The.Takeover.2022.720p.WEBRip.x264.AAC-[YTS.MX].mp4&size=852279233