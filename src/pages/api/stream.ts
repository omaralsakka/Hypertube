import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from 'next/router';
import ffmpeg from 'fluent-ffmpeg';
import fs from "fs";

export const createStream = (req: NextApiRequest, res: NextApiResponse, moviePath: string) => {
	console.log("in the stream api endpoint");
	const router = useRouter();
	const range = req.headers.range
	const imdbCode = router.query.imdbCode;
	console.log('range : ', range);
	console.log('imdb code : ', imdbCode)
	if (!range) {
		res.status(400).send('Requires Range header');
	} else {
		const videoPath = `../../movies/${imdbCode}`; // this might be wrong
		const isMp4 = videoPath.endsWith('mp4');
		const videoSize = fs.statSync(`${videoPath}`).size;
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