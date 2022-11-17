import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

interface SubtitlesDbObj {
		id: string,
		imdb_code: string,
		language: string,
		path: string,
}

interface SubtitlesObj {
	kind: string;
	src: string;
	srcLang: string;
	label: string;
	default: boolean;
}

export default async function subtitles(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await unstable_getServerSession(req, res, authOptions)
	if(session) {
		const regexImdb: RegExp = /imdbCode=(.*)/;
		const imdbCode: RegExpMatchArray | string | null | undefined = req.url?.match(regexImdb);
	
		if(imdbCode) {
			const subs: SubtitlesDbObj[] = await prisma.subtitles.findMany({
				where: {
					imdb_code: imdbCode[1],
				},
			});
		
			let subtitleTracks: SubtitlesObj[] = [];
		
			subs.forEach((sub: SubtitlesDbObj) => { 
				subtitleTracks.push({
					kind: 'subtitles',
					src: `http://localhost:3000/api/stream-subtitles?subpath=${sub.path}`,
					srcLang: `${sub.language}`,
					label: `${sub.language}`,
					default: true,
				});
			});
			res.status(200).send(subtitleTracks);
		} else {
			res.redirect('/home')
		}
	} else {
		res
			.redirect('/')
	}
}
