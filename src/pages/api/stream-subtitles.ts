import { NextApiRequest, NextApiResponse } from 'next';
import fs from "fs";

export default function streamSubtitles(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const regexPath = /subpath=(.*)/;
	let subPath: any = req.url?.match(regexPath); // fix typescript
	let subtitles;
	fs.readFile(subPath[1], (err, data) => {
		if (err) {
			console.log('Some error has occured : ', err)
			return res.status(404).send("Wrong file format or some other error");
		}
		subtitles = data;
	})
	return res.status(200).send(subtitles);
};
