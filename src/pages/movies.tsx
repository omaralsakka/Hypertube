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
const Movies = () => {
	const [search_term, setsearch_ter] = useState('');
	let moviesData = [];

	type FilterInputs = {
		fromYear: number;
		toYear: number;
		genre: string;
		imdbRating: string;
		orderBy: string;
		sortBy: string;
		quality: string;
		seeds: number;
		fromRunTime: number;
		toRunTime: number;
		limit: number;
		description: string;
	};
	const [filterInputs, setFilterInputs] = useState({
		order: 'desc',
		sort: 'rating',
		imdbRating: 1,
		genre: 'Horror',
		seeds: 10,
		fromYear: 1950,
		toYear: 2023,
		search_term,
		fromRunTime: 5,
		toRunTime: 200,
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
	// const { data, error } = trpc.movie.search.useQuery({
	// 	filterInputs,
	// 	search_term,
	// });

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
			{/* {data &&
				data.movies.map((movie: Movie) => (
					<>
						<option key={movie?.title}>{movie?.title}</option>
						<img src={movie?.medium_cover_image}></img>
					</>
				))} */}
		</>
	);
};

export default Movies;
