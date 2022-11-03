import { env } from 'process';
import { prisma } from '../../server/db/client';
import https from 'https';
import fs from'fs';

const download =  (url: string, dest: string) => {
	const file = fs.createWriteStream(dest);
	const request = https.get(url, (response) => {
		response.pipe(file);
		file.on('finish', function() {
			console.log("SUBTITLE FILE DOWNLOAD FINISHED");
		  file.close();
		});
	});
};

export const downloadSubtitles = async (imdbCode: string) => {

	const optionsSearch = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Api-Key': 'YF2CcQBsm159bPwSh3GUlFHDCbQhYzEs',
		},
	};

	fetch(
		`https://api.opensubtitles.com/api/v1/subtitles?imdb_id=${imdbCode}`,
		optionsSearch
	)
		.then((response) => response.json())
		.then((response) => {

			const subtitleID = response.data.filter((resp: {id: string, attributes: {language: string}}) => {
					if(resp.attributes.language === 'en') {
						return resp.id
					}
			})
			console.log('THIS IS ID\'s', subtitleID);

			/* subtitleID.forEach((subtitle: {id: string}) => {

				const optionsDownload = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json', 
						'Api-Key': 'YF2CcQBsm159bPwSh3GUlFHDCbQhYzEs',
					},
					body: `{"file_id":${subtitle.id}}`,
				};

				fetch('https://api.opensubtitles.com/api/v1/download', optionsDownload)
					.then((response) => response.json())
					.then(response => {
						download(response.link, `${subtitle.id}.srt`)
					})
					.catch(err => console.error(err));
			}); */
		})
		.catch((err) => console.error(err));
};
