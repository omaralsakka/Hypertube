import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import fs from "fs";
import { Session } from 'next-auth';

export default function streamSubtitles(
	req: NextApiRequest,
	res: NextApiResponse
) { return new Promise(async (resolve, reject) => {
	const session: Session | null = await unstable_getServerSession(req, res, authOptions)
	if(session) {
		const regexPath: RegExp = /subpath=(.*)/;
		let subPath: any = req.url?.match(regexPath);
	
		fs.readFile(subPath[1], (err, data) => {
			if (err) {
				console.log('Some error has occured : ', err)
				res.status(404).send("Wrong file format or some other error");
				reject('Rejected');
			}
			res.status(200).send(data);
			resolve('Resolved');
		});
	} else {
		reject({message: 'Not Authorized'})
	}
});
}
