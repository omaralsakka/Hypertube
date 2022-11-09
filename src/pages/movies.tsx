import { useState } from 'react';
import { trpc } from '../utils/trpc';

import FilterControls from '../components/filtercontrols';
import { Movie } from '../types/appTypes';

type Inputs = {
	search_term: string;
	description: string;
};
// const schema = z.object({
// 	search_term: z.string().min(1, { message: 'Required' }),
// 	// description: z.string().min(1, { message: 'Required' }),
// });

type FilterInputs = {
	fromYear: number;
	toYear: number;
	genre: string;
	imdbRating: number;
	orderBy: string;
	sortBy: string;
	quality: string;
	seeds: number;
	fromRunTime: number;
	toRunTime: number;
	limit: number;
	description: string;
};
const Movies = () => {
	const [search_term, setsearch_ter] = useState('');
	let moviesData = [];

	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: 1,
		genre: 'Horror',
		seeds: 10,
		fromYear: 0,
		toYear: 2021,
		search_term,
		fromRunTime: 0,
		toRunTime: 300,
		limit: 50,
		description: '',
	});
	// const {
	// 	order,
	// 	sort,
	// 	imdbRating,
	// 	genre,
	// 	seeds,
	// 	fromYear,
	// 	toYear,
	// 	fromRunTime,
	// 	toRunTime,
	// 	limit,
	// } = filterInputs;
	const { data, error } = trpc.movie.search.useQuery({
		search_term,
		fromYear: parseInt(filterInputs.fromYear),
		toYear: parseInt(filterInputs.toYear),
		fromRunTime: parseInt(filterInputs.fromRunTime),
		toRunTime: parseInt(filterInputs.toRunTime),
		imdbRating: parseInt(filterInputs.imdbRating),
		orderBy: filterInputs.orderBy,
		sortBy: filterInputs.sortBy,
	});

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
		console.log(name);
		console.log(value);
	};

	const onFilterChange = (e: any) => {
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
	};
	// const onChange = (e) =>
	// 	setInputs({ ...inputs, [e.target.name]: e.target.value });

	return (
		<>
			{filterInputs && (
				<FilterControls
					onFilterChange={onFilterChange}
					filterInputs={filterInputs}
				/>
			)}
			{/* Title <input />
			Description <input /> */}
			{/* </Form> */}
			Search title
			<input name="search_term" onChange={onSearchChange} value={search_term} />
			{data &&
				data.movies.map((movie: Movie) => (
					<>
						<option key={movie?.title}>{movie?.title}</option>
						<img src={movie?.medium_cover_image}></img>
					</>
				))}
		</>
	);
};

export default Movies;
