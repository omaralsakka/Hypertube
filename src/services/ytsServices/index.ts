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

// export const addMovies = async () => {
// 	console.log(data);
// 	for (const element of data.data.movies) {
// 		console.log(element);
// 		// const newMovie = await prisma.movie.upsert({
// 		// 	where: {
// 		// 		id: element.id,
// 		// 	},
// 		// 	update: {},
// 		// 	create: {
// 		// 		title: 'blaa',
// 		// 	} as Prisma.MovieCreateInput,
// 		const newMovie: any = await prisma.comment.create({
// 			data: {
// 				title: element.title,
// 			},
// 		});

// 		const isMovieDownloaded = await prisma.movies.findFirst({
// 			where: { imdb_code: element.imdb },
// 		});
// 	}
// };
