import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
var cuid = require('cuid');

const Movies = () => {
	const { data, error } = trpc.movie.search.useQuery({
		order: 'asc',
		sort: 'rating',
		imdbRating: 1,
		// genres: 'Action',
		fromYear: 1950,
		toYear: 2023,
		search_term: '',
		fromRunTime: 5,
		toRunTime: 200,
		// description: '',
	});

	useEffect(() => {
		console.log(data);
	}, []);

	return <></>;
};

export default Movies;
