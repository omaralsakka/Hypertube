/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NextApiRequest, NextApiResponse } from 'next';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import { OutgoingHttpHeaders } from 'http';

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
	const session = await unstable_getServerSession(req, res, authOptions);

	if (session?.token && req?.url && req.url.length > 35) {
		const regexPath = /path=(.*)&/;
		const regexImdb = /imdbCode=(.*?)&/;
		const regexSize = /size=(.*)/;
		const regexRange = /bytes=(.*)-/;

		let moviePath: RegExpMatchArray | string | null | undefined =
			req.url?.match(regexPath);
		if (moviePath && moviePath[1]) moviePath = decodeURI(moviePath[1]);
		const imdbCode: RegExpMatchArray | null | undefined =
			req.url?.match(regexImdb);
		const fullSize: RegExpMatchArray | null | undefined =
			req.url?.match(regexSize);
		const range: string | undefined = req.headers.range;

		let videoPath: string | null = null;
		if (imdbCode) {
			videoPath = `./movies/${imdbCode[1]}/${moviePath}`;
		}

		if (!range && fullSize && imdbCode && videoPath) {
			// eslint-disable-next-line @typescript-eslint/ban-types
			const head: {} = {
				'Content-Length': fullSize[1],
				'Content-Type': 'video/mp4',
			};
			res.writeHead(200, head);
			const videoStream: fs.ReadStream = fs.createReadStream(videoPath);
			videoStream.pipe(res);
		} else if (fullSize && imdbCode && range && videoPath) {
			let parsedRange: RegExpMatchArray | null | string | number;
			parsedRange = range.match(regexRange);
			if (parsedRange !== null) {
				parsedRange = Number(parsedRange[1]);
			}

			let isMp4 = false;
			if (videoPath.endsWith('mp4') && videoPath.includes('YTS')) {
				isMp4 = true;
			} else if (
				videoPath.includes('YIFY') &&
				fs.statSync(videoPath).size === Number(fullSize[1])
			) {
				isMp4 = true;
			}

			const videoSize = Number(fullSize[1]);
			const CHUNK_SIZE = 20e6;
			const start = Number(range.replace(/\D/g, ''));

			const end: number = isMp4
				? Math.min(start + CHUNK_SIZE, videoSize - 1)
				: videoSize - 1;

			const contentLength: number = end - start + 1;
			const headers: OutgoingHttpHeaders = isMp4
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

			if (parsedRange !== null && parsedRange > fs.statSync(videoPath).size) {
				res.status(216).send('Video download not finished.');
			} else {
				res.writeHead(206, headers);
			}
			const videoStream: fs.ReadStream = fs.createReadStream(videoPath, {
				start,
				end,
			});
			if (isMp4) {
				videoStream.pipe(res);
			} else {
				ffmpeg(videoPath)
					.toFormat('webm')
					.videoBitrate('512k')
					// .on('error', (err) => {})
					.pipe(res);
			}
		} else {
			res.status(404).json('Invalid input. Movie not found. Please try again.');
		}
	} else {
		res.redirect('/');
	}
}
