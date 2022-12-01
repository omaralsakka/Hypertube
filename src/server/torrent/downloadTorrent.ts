/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import torrentStream from 'torrent-stream';
import { prisma } from '../../server/db/client';
import fs from 'fs';

interface DatabaseInfo {
	id: string;
	imdb_code: string;
	movie_path: string;
	size: number;
	downloaded: number;
	date: string;
}

export const downloadTorrent = async (
	magnetLink: string,
	imdbCode: string,
	movieDbInfo: DatabaseInfo | null
) =>
	new Promise((resolve) => {
		if (movieDbInfo !== null) {
			resolve(movieDbInfo);
		}

		let newMovie: DatabaseInfo;

		let filePath: string = movieDbInfo !== null ? movieDbInfo.movie_path : '';

		const torrentStreamOptions: {} = {
			trackers: [
				'udp://open.demonii.com:1337/announce',
				'udp://tracker.openbittorrent.com:80',
				'udp://tracker.coppersurfer.tk:6969',
				'udp://glotorrents.pw:6969/announce',
				'udp://tracker.opentrackr.org:1337/announce',
				'udp://torrent.gresille.org:80/announce',
				'udp://p4p.arenabg.com:1337',
				'udp://tracker.leechers-paradise.org:6969',
			],
			path: `./movies/${imdbCode}`,
		};

		const engine: TorrentStream.TorrentEngine = torrentStream(
			magnetLink,
			torrentStreamOptions
		);

		engine.on('ready', () => {});

		engine.on('torrent', () => {
			engine.files.forEach(async (file: TorrentStream.TorrentFile) => {
				if (
					file.name.endsWith('.mp4') ||
					file.name.endsWith('.mkv') ||
					file.name.endsWith('.webm')
				) {
					file.select();
					if (movieDbInfo === null) {
						let timestamp: Date | string = new Date();
						timestamp = timestamp.toString();
						try {
							newMovie = await prisma.movies.create({
								data: {
									imdb_code: imdbCode,
									movie_path: file.path,
									size: file.length,
									downloaded: 0,
									date: timestamp,
								},
							});
						} catch (error) {
							console.error(error);
						}
					}
					filePath = file.path;
				}
			});
		});

		engine.on('download', () => {
			if (fs.existsSync(`./movies/${imdbCode}/${filePath}`)) {
				if (
					fs.statSync(`./movies/${imdbCode}/${filePath}`).size / (1024 * 1024) >
					25
				) {
					resolve(newMovie);
				}
			}
		});

		engine.on('idle', async () => {
			let dbID: string = movieDbInfo === null ? newMovie?.id : movieDbInfo?.id;

			if (dbID) {
				try {
					await prisma.movies.update({
						where: {
							id: dbID,
						},
						data: {
							downloaded: 1,
						},
					});
				} catch (error) {
					console.error(error);
				}
			}

			engine.destroy(() => {});
		});
	});
