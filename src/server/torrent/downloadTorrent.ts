import torrentStream from 'torrent-stream';


export const downloadTorrent = (magnetLink: string) => {

	const torrentStreamOptions: {} = { // this will have to be specified later, testing purpose
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
		path: './movies'
	};

	const engine: TorrentStream.TorrentEngine = torrentStream(magnetLink, torrentStreamOptions);
	
	engine.on('ready', () => {
		console.log('Engine is ready!');
		console.log('This is the url passed: ', magnetLink);
	})
	
	engine.on('torrent', () => {
		console.log('These are the files : ', engine.files);
		engine.files.forEach((file: TorrentStream.TorrentFile) => {
			console.log('filename : ', file.name);
			if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv') || file.name.endsWith('.webm')) {
				file.select();
			  } else {
				file.deselect();
			}
			// at some point we might want to save the path of the file to database
		});
	});

	engine.on('download', () => {
		console.log('Piece downloaded!');
	});
	
	engine.on('idle', () => {
		engine.destroy(() => {
			console.log('All connections to peers destroyed.');
		})
	})
};
