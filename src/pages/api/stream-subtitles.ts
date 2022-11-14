import { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

export default function streamSubtitles(
	req: NextApiRequest,
	res: NextApiResponse
) { return new Promise((resolve, reject) => {
	const regexPath = /subpath=(.*)/;
	let subPath: any = req.url?.match(regexPath); // fix typescript

	fs.readFile(subPath[1], (err, data) => {
		if (err) {
			console.log('Some error has occured : ', err)
			res.status(404).send("Wrong file format or some other error");
			reject('Rejected');
		}
		res.status(200).send(data);
		resolve('Resolved');
	});
});
}
