import torrentStream from 'torrent-stream';
import { prisma } from '../../server/db/client';
import fs from "fs";

export const downloadTorrent = async (magnetLink: string, imdbCode: string) => new Promise((resolve) => {

	let newMovie: {} | undefined;
	let filePath: string;

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
		path: `./movies/${imdbCode}`
	};

	const engine: TorrentStream.TorrentEngine = torrentStream(magnetLink, torrentStreamOptions);
	
	engine.on('ready', () => {
		console.log('Engine is ready! This is the url passed: ', magnetLink);
	})
	engine.on('torrent', () => {
		engine.files.forEach(async (file: TorrentStream.TorrentFile) => {
			if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.webm')) {
				file.select();
				newMovie = await prisma.movies.create({
					data: {
						imdb_code: imdbCode,
						movie_path: file.path,
						size: file.length,
					},
				});
				filePath = file.path;
			  } else {
				file.deselect();
			}
		});
	});

	engine.on('download', () => {
		console.log('Piece downloaded!');
		//console.log('IS FILE SIZE ENOUGH TO START STREAM : ', fs.statSync(`./movies/${imdbCode}/${filePath}`).size / (1024 * 1024) > 25);
		if (fs.existsSync(`./movies/${imdbCode}/${filePath}`)) {
			if(fs.statSync(`./movies/${imdbCode}/${filePath}`).size / (1024 * 1024) > 25) {
				console.log('RESOLVED RESOLVED RESOLVED RESOLVED')
				resolve(newMovie);
			}
		}
	});
	
	engine.on('idle', () => {
		// set the movie as downloaded into database or somewhere // have to add a new column as well to table
		engine.destroy(() => {
			console.log('All connections to peers destroyed.');
		})
	});
});
