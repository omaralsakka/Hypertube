import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
var cuid = require('cuid');

const Movies = () => {
	const { data, error } = trpc.movie.search.useQuery({
		// orderBy: 'desc',

		// sortBy: 'title',
		// imdbRating: 1,
		// genre: 'Action',
		// quality: '720p',
		// fromYear: 1950,
		// toYear: 2022,
		search_term: 'Next',
	});

	useEffect(() => {
		console.log(data);
	}, []);

	return <></>;
};

export default Movies;
