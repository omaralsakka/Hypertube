import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import fs from "fs";
import { Session } from 'next-auth';
import { rejects } from 'assert';

export default function streamSubtitles(
	req: NextApiRequest,
	res: NextApiResponse
) { new Promise(async (resolve, reject) => {
	const session: Session | null = await unstable_getServerSession(req, res, authOptions)
	if(session?.token) {
		const regexPath: RegExp = /subpath=(.*)/;
		let subPath: any = req.url?.match(regexPath);
		if(subPath) {
			fs.readFile(subPath[1], (err, data) => {
				if (err) {
					res.status(404).send("Wrong file format, path or some other error");
				}
				res.status(200).send(data);
			});
		}
		else {
			res.redirect('/home')
		}
	} else {
		res.redirect('/')
	}
 });
}