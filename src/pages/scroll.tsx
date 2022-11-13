import InfiniteScroll from 'react-infinite-scroll-component';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Scroll() {
	// const [items, setItems] = useState(Array.from({ length: 20 }));

	// const fetchMoreData = () => {
	// 	// a fake async api call like which sends
	// 	// 20 more records in 1.5 secs
	// 	setTimeout(() => {
	// 		setItems(items.concat(Array.from({ length: 20 })));
	// 	}, 1500);
	// };
	const [page, setPage] = useState(1);

	const [search_term, setsearch_ter] = useState('');
	let moviesData = [];

	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: '1',
		genre: 'Action',
		seeds: '1',
		fromYear: '1930',
		toYear: '2021',
		search_term,
		fromRunTime: '0',
		toRunTime: '300',
		limit: '5',
		description: '',
		quality: '720p',
		page,
	});

	const [movies, setMovies] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	useEffect(() => {
		const getMovies = async () => {
			const response = await axios('/api/movie', {
				method: 'POST',
				data: {
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
					page,
				},
			});
			setMovies(response.data);
			// if (response.status === 201) {
			// 	const data = await response.json();
			// 	console.log(data);
			// 	if (data.filename) setPhoto(`/images/${data.filename}`);
			// } else {
			// 	setFileError(true);
			// }
		};
		setPage(page + 1);
		console.log('getMovies');
		console.log(movies);
		getMovies();
	}, [search_term]);

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
		console.log(name);
		console.log(value);
	};

	const onFilterChange = (e: any) => {
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
	};

	const style = {
		height: 30,
		border: '1px solid green',
		margin: 6,
		padding: 8,
	};
	const getMoviesTwo = async () => {
		const response = await axios('/api/movie', {
			method: 'POST',
			data: {
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
				page,
			},
		});
		console.log(response.data);
		// setMovies(response.data);

		if (response.data.length < 5) {
			setHasMore(false);
		}
		movies;
		setMovies((movies) => [...movies, ...response.data]);
		console.log(movies);

		// if (response.status === 201) {
		// 	const data = await response.json();
		// 	console.log(data);
		// 	if (data.filename) setPhoto(`/images/${data.filename}`);
		// } else {
		// 	setFileError(true);
		// }
	};

	const icrementPage = () => {
		setPage(page + 1);
		// setTimeout(() => {
		getMoviesTwo();
		// }, 1500);

		console.log('page change ' + page.toString());
	};

	return (
		<>
			Search title
			<input name="search_term" onChange={onSearchChange} value={search_term} />
			<InfiniteScroll
				dataLength={movies.length} //This is important field to render the next data
				next={icrementPage}
				hasMore={hasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
				// below props only if you need pull down functionality
				// 	refreshFunction={this.refresh}
				// 	pullDownToRefresh
				// 	pullDownToRefreshThreshold={50}
				// 	pullDownToRefreshContent={
				// 		<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
				// 	}
				// 	releaseToRefreshContent={
				// 		<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
				// 	}
			>
				{movies &&
					movies.map((movie: Movie) => (
						<div style={style} key={movie.title}>
							<option>
								{movie?.title} {movie.rating}
							</option>
						</div>
					))}
			</InfiniteScroll>
			{/* <FilterControls
					onFilterChange={onFilterChange}
					filterInputs={filterInputs}
				/> */}
		</>
	);
}

export default Scroll;
// {items.map((i, index) => (
// 	<div style={style} key={index}>
// 		div - #{index}
// 	</div>
// /<img src={movie?.medium_cover_image}></img>
