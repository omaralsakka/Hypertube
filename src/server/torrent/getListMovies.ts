import axios from 'axios';
import { downloadTorrent } from './downloadTorrent';

export const getListMovies = (searchValue: string) => {

	let movieTitle: string;
	let infoHash;
	let uri: string;
	
	searchValue = encodeURI(searchValue);
	console.log('searchvalue : ', searchValue);

	axios.get(`https://yts.torrentbay.to/api/v2/list_movies.json?query_term=${searchValue}`)
	.then(res => { 
		if(res.data.data.movie_count > 0) {
			//console.log(res.data.data.movies);
			movieTitle = res.data.data.movies[0].title_long;
			infoHash = res.data.data.movies[0].torrents.reduce((curr: { size_bytes: number; }, prev: { size_bytes: number; }) => prev.size_bytes < curr.size_bytes ? prev : curr);
			infoHash = infoHash.hash;
			uri = encodeURI(`magnet:?xt=urn:btih:${infoHash}` + `&dn=${movieTitle}`);
			//downloadTorrent(uri)
		} else {
			console.log('No movies found');
		}
	}).catch(error => {
		console.log(error);
	});
};

getListMovies('avengers infinity war');