import { NextApiRequest, NextApiResponse } from 'next';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const config = {
	api: {
		responseLimit: '20mb',
	},
};

export default async function createStream(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await unstable_getServerSession(req, res, authOptions)

	if(session?.token) {
		const regexPath: RegExp = /path=(.*)&/;
		const regexImdb: RegExp = /imdbCode=(.*?)&/;
		const regexSize: RegExp = /size=(.*)/;
		const regexRange: RegExp = /bytes=(.*)-/;

		let moviePath: RegExpMatchArray | string | null | undefined = req.url?.match(regexPath);
		if(moviePath && moviePath[1])
			moviePath = decodeURI(moviePath[1]);
		const imdbCode: RegExpMatchArray | null | undefined = req.url?.match(regexImdb);
		const fullSize: RegExpMatchArray | null | undefined = req.url?.match(regexSize);
		const range: string | undefined = req.headers.range;

		let videoPath: string | null = null;
		if(imdbCode) {
			videoPath = `./movies/${imdbCode[1]}/${moviePath}`;
		}

		if (!range && fullSize && imdbCode && videoPath) {
	
			console.log("No Range Defined");
			const head: {} = {
				'Content-Length': fullSize[1],
				'Content-Type': 'video/mp4',
			}
			res.writeHead(200, head)
			const videoStream: fs.ReadStream = fs.createReadStream(videoPath)
			videoStream.pipe(res)

		} else if(fullSize && imdbCode && range && videoPath) {

			let parsedRange: RegExpMatchArray | null | string | number;
			parsedRange = range.match(regexRange);
			if(parsedRange !== null) {
				parsedRange = Number(parsedRange[1]);
			}

			let isMp4: boolean = false;
			if(videoPath.endsWith('mp4') && videoPath.includes('YTS')) {
				isMp4 = true;
			} else if(videoPath.includes('YIFY') && fs.statSync(videoPath).size === Number(fullSize[1])) {
				isMp4 = true;
			}

			const videoSize: number = Number(fullSize[1]);
			const CHUNK_SIZE: number = 20e6;
			let start: number = Number(range.replace(/\D/g, ''));

			const end: number = isMp4
			? Math.min(start + CHUNK_SIZE, videoSize - 1)
			: videoSize - 1;

			const contentLength: number = (end - start) + 1;
			const headers: {} = isMp4
			? {
				'Content-Range': `bytes ${start}-${end}/${videoSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': contentLength,
				'Content-Type': 'video/mp4',
			}
			: {
				"Content-Range": `bytes ${start}-${end}/${videoSize}`,
						"Accept-Ranges": "bytes",
						"Content-Type": "video/webm"
			};
	
			if(parsedRange !== null && parsedRange > fs.statSync(videoPath).size) {
				res.status(216).send('Video download not finished.');
			} else {
				res.writeHead(206, headers);
			}
	
			const videoStream: fs.ReadStream = fs.createReadStream(videoPath, { start, end });
			if (isMp4) {
				videoStream.pipe(res)
			} else {
				ffmpeg(videoPath)
					.toFormat('webm')
					.videoBitrate('512k')
					.on('error', (err) => {
						console.log('An error occurred: ' + err.message); // remove this before submit
					})
					.pipe(res);
			}
		} else {
			res
				.status(404)
				.json( 'Invalid input. Movie not found. Please try again.' );
		}
	} else {
		res.redirect('/')
	}
}
