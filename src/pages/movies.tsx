import { useState } from 'react';

import { trpc } from '../utils/trpc';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FilterControls from '../components/filtercontrols';
import { Movie } from '../types/appTypes';
import Form from 'react-bootstrap/Form';

type Inputs = {
	search_term: string;
	description: string;
};
// const schema = z.object({
// 	search_term: z.string().min(1, { message: 'Required' }),
// 	// description: z.string().min(1, { message: 'Required' }),
// });
const Movies = () => {
	const [search_term, setsearch_ter] = useState('');
	let moviesData = [];
	// const {
	// 	watch,
	// 	register,
	// 	handleSubmit,
	// 	getValues,
	// 	formState: { errors, isSubmitting, isDirty, isValid },
	// } = useForm<Inputs>({
	// 	mode: 'onChange',
	// 	resolver: zodResolver(schema),
	// });

	// const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
	// 	console.log(data);
	// };
	const { data, error } = trpc.movie.search.useQuery({
		order: 'asc',
		sort: 'rating',
		imdbRating: 1,
		// genres: 'Action',
		fromYear: 1950,
		toYear: 2023,
		search_term,
		fromRunTime: 5,
		toRunTime: 200,
		description: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setsearch_ter(value);
		console.log(name);
		console.log(value);
	};

	const onChange = (e) =>
		setInputs({ ...inputs, [e.target.name]: e.target.value });

	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<>
			<FilterControls props={onSubmit} />
			{/* <Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Control {...register('search_term')}></Form.Control>
				<Form.Control {...register('description')}></Form.Control> */}
			{/* Title <input />
			Description <input /> */}
			{/* </Form> */}
			Title
			<input name="search_term" onChange={handleChange} value={search_term} />
			{data &&
				data.movies.map((movie: Movie) => (
					<option key={movie?.title}>{movie?.title}</option>
				))}
		</>
	);
};

export default Movies;
