import axios from 'axios';

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
