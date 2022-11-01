import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';

const Comments = () => {
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: 1,
	});

	useEffect(() => {
		console.log(data);
	}, []);

	return '<></>';
};

export default Comments;
