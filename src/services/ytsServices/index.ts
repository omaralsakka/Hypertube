import axios from 'axios';
import { MovieId } from '../../types/appTypes';
const baseUrl = 'https://yts.mx/api/v2/';
// import { Prisma } from '@prisma/client';
// import { prisma } from '../../server/db/client';
// const data = require('./data.json');

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

// export const getMovie = async (movieId: MovieId) => {
// 	try {
// 		if (movieId?.length) {
// 			const response = await axios.get(
// 				`${baseUrl}/movie_details.json?movie_id=${movieId}`
// 			);
// 			return response.data.data.movie;
// 		}
// 		return false;
// 	} catch (error) {
// 		console.error(error);
// 		return false;
// 	}
// };

export const getMovie = async (imdb_code: string) => {
	const response = await axios('/api/movie-metadata', {
		method: 'GET',
		data: {
			imdb_code,
		},
	});
};
