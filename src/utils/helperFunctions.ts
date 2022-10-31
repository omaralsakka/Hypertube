import { Movie } from '../types/appTypes';
import axios from 'axios';

export const movieRate = (rating: string | undefined) => {
	switch (rating) {
		case 'G':
			return 'All ages';
		case 'PG 12':
			return '12+';
		case 'PG 13':
			return '13+';
		case 'R':
			return '16+';
		case 'NC-17':
			return '18+';
		default:
			return '16+';
	}
};

export const getOmdb = async (movie: Movie) => {
	const baseUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=3412b01c&t=${movie.title_english}&y=${movie.year}`;
	const resp = await axios.get(baseUrl);
	return resp.data;
};
