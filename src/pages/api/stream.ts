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

export default function createStream(
	req: NextApiRequest,
	res: NextApiResponse
) { return new Promise(async (resolve, reject) => {
	const session = await unstable_getServerSession(req, res, authOptions)
	if(session) {
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
	
			let isMp4:boolean;
			if(videoPath.endsWith('mp4') && videoPath.includes('YTS')) {
				isMp4 = true;
			} else {
				isMp4 = false;
			}
	
			const videoSize: number = Number(fullSize[1]);
			const CHUNK_SIZE: number = 20e6;
			let start: number = Number(range.replace(/\D/g, ''));
	
			const end: number = isMp4
			? Math.min(start + CHUNK_SIZE, videoSize - 1)
			: videoSize - 1;
	
			const contentLength: number = (end - start) + 1;
			// error - RangeError [ERR_OUT_OF_RANGE]: The value of "end" is out of range. It must be >= 0 && <= 9007199254740991. Received -1
			// GOT THIS RANDOMLY IN THE SERVER LOG, I once thought about this '-1' thing and apparently it can be cause issues.
			// if end === -1 reject();
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
						"Content-Type": "video/matroska"
			};
	
			if(parsedRange !== null && parsedRange > fs.statSync(videoPath).size) {
				res.status(216).send('Video download not finished.');
			} else {
				res.writeHead(206, headers);
			}
	
			const videoStream: fs.ReadStream = fs.createReadStream(videoPath, { start, end });
			if (isMp4) { // could check also if the YIFY has fully downloaded, then the conversion is not necessary
				videoStream.pipe(res)
			} else {
				ffmpeg(videoPath) // instead of readstream i am formating the actual file, this has improved the streaming a lot.
					.toFormat('webm')
					.videoBitrate('512k')
					.on('error', (err) => {
						console.log('An error occurred: ' + err.message);
					})
					.pipe(res);
			}
		} else {
			console.log("ERROR ERROR ERROR ERROR ERROR");
			reject({message: 'Given URL and input is invalid. Please try again.'});
		}
	} else {
		reject({message: 'Not Authorized'});
	}
  });
}
