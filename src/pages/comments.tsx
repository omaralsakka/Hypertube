import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';

const Comments = () => {
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: 1,
	});
	const mutation = trpc.comment.createComment.useMutation();
	const addComment = () => {
		try {
			console.log(data);
			mutation.mutate({
				imdb_code: 1,
				comment_text: 'blaa',
				user_id: 1,
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		console.log(data);
	}, []);

	return (
		<>
			<button onClick={addComment}></button>
		</>
	);
};

export default Comments;
