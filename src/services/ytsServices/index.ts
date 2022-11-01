import axios from 'axios';
import { MovieId } from '../../types/appTypes';
const baseUrl = 'https://yts.mx/api/v2/';

export const getSuggestedMovies = async (movieId: number) => {
	try {
		const response = await axios.get(
			`${baseUrl}/movie_suggestions.json?movie_id=${movieId}`
		);
		return response.data.data.movies;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const getMovie = async (movieId: MovieId) => {
	try {
		if (movieId?.length) {
			const response = await axios.get(
				`${baseUrl}/movie_details.json?movie_id=${movieId}`
			);
			return response.data.data.movie;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};
