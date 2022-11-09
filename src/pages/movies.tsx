import { useState } from 'react';
import { trpc } from '../utils/trpc';

import FilterControls from '../components/filtercontrols';
import { Movie } from '../types/appTypes';

type Inputs = {
	search_term: string;
	description: string;
};
type FilterInputs = {
	fromYear: string;
	toYear: string;
	genre: string;
	imdbRating: string;
	orderBy: string;
	sortBy: string;
	quality: string;
	seeds: string;
	fromRunTime: string;
	toRunTime: string;
	limit: string;
	description: string;
};
const Movies = () => {
	const [search_term, setsearch_ter] = useState('');
	let moviesData = [];

	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: '1',
		genre: 'Horror',
		seeds: '1',
		fromYear: '0',
		toYear: '2021',
		search_term,
		fromRunTime: '0',
		toRunTime: '300',
		limit: '50',
		description: '',
		quality: '720p',
	});

	const { data, error } = trpc.movie.search.useQuery({
		search_term,
		fromYear: parseInt(filterInputs.fromYear),
		toYear: parseInt(filterInputs.toYear),
		fromRunTime: parseInt(filterInputs.fromRunTime),
		toRunTime: parseInt(filterInputs.toRunTime),
		imdbRating: parseInt(filterInputs.imdbRating),
		orderBy: filterInputs.orderBy,
		sortBy: filterInputs.sortBy,
		quality: filterInputs.quality,
		seeds: parseInt(filterInputs.seeds),
		description: filterInputs.description,
		genre: filterInputs.genre,
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

	return (
		<>
			{filterInputs && (
				<FilterControls
					onFilterChange={onFilterChange}
					filterInputs={filterInputs}
				/>
			)}
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
