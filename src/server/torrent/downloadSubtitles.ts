import { env } from 'process';
import { prisma } from '../../server/db/client';
import https from 'https';
import fs from 'fs';

const download = async (url: string, dest: string, imdbCode: string, subsData: {attributes: {language: string}}) => {
	if (!fs.existsSync(`./subtitles/${imdbCode}`))
		fs.mkdirSync(`./subtitles/${imdbCode}`, { recursive: true });

	try {
		await prisma.subtitles.create({
			data: {
				imdb_code: imdbCode,
				language: subsData.attributes.language,
				path: dest,
			},
		});
	} catch (error) {
		console.error(error);
	}

	const file = fs.createWriteStream(dest);
	const request = https.get(url, (response) => {
		response.pipe(file);
		file.on('finish', function () {
			console.log('SUBTITLE FILE DOWNLOAD FINISHED');
			file.close();
		});
	});
};

let langObj = {
	en: 0,
	fi: 0,
	fr: 0,
}

const langParser = (lang: string) => {
	if(lang === 'en') {
		langObj.en += 1;
		if(langObj.en >= 2)
			return false
		return true
	} else if(lang === 'fi') {
		langObj.fi += 1;
		if(langObj.fi >= 2)
			return false
		return true
	} else if(lang === 'fr') {
		langObj.fr += 1;
		if(langObj.fr >= 2)
			return false
		return true
	}
}

const resetLangObj = () => {
	return ({
		en: 0,
		fi: 0,
		fr: 0,
	})
}

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
			console.log("THESE ARE ALL THE SUBTITLES : ", response.data);
			const subtitleID = response.data.filter(
				(resp: { id: string, attributes: { language: string } }) => { //  the logic in the filtering could be better if the condition was 
																			  // most downloads instead of just the language.
					if (
						(resp.attributes.language === 'en' ||
						resp.attributes.language === 'fi' ||
						resp.attributes.language === 'fr') &&
						langParser(resp.attributes.language) === true
					) {
						return resp;
					}
					return resp
				}
			);
			langObj = resetLangObj();
			console.log("ANOTHER CHECK FOR ALL SUBS", subtitleID);
			subtitleID.forEach((subtitle: {id: string, attributes: { language: string }}) => {

				const optionsDownload = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json', 
						'Api-Key': 'YF2CcQBsm159bPwSh3GUlFHDCbQhYzEs',
					},
					body: `{"file_id":${subtitle.id},
						"sub_format": "webvtt"}`,
				};

				fetch('https://api.opensubtitles.com/api/v1/download', optionsDownload)
					.then((response) => response.json())
					.then(response => {
						download(response.link, `./subtitles/${imdbCode}/${imdbCode}-${subtitle.attributes.language}.vtt`, imdbCode, subtitle)
					})
					.catch(err => console.error(err));
			});
		})
		.catch((err) => console.error(err));
};
