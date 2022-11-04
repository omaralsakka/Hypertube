import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

/* interface SubtitlesObj {
		id: string,
		imdb_code: string,
		language: string,
		path: string,
} */

interface SubtitlesObj {
	kind: string,
	src: string,
	srcLang: string,
	label: string,
	default: boolean,
}

export default async function subtitles(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const imdbCode: string = req.body.imdbCode;

	const subs = await prisma.subtitles.findMany({
		where: {
			imdb_code: imdbCode,
		},
	})

	let subtitleTracks: SubtitlesObj[] = [];

	subs.forEach(sub => {
		subtitleTracks.push({
			kind: "subtitles",
			src: `/api/stream-subtitles?subpath=${sub.path}`,
			srcLang: `${sub.language}`,
			label: `${sub.language}`,
			default: true,
		})
	})
	res.status(200).send(subtitleTracks);
	//res.status(200).send("HAHAHAHAH");
};
