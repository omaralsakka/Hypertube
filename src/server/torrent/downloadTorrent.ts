import torrentStream from 'torrent-stream';


export const downloadTorrent = (magnetLink: string) => {

	const torrentStreamOptions: {} = {
		path: './movies'
	};

	const engine: TorrentStream.TorrentEngine = torrentStream(magnetLink, torrentStreamOptions);

	engine.on('torrent', () => {
		engine.files.forEach((file) => {
			file.select;
		});
	});
};

