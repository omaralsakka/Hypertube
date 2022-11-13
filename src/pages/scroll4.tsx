import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import useInfiniteScroll from 'react-infinite-scroll-hook';

function SimpleInfiniteList() {
	//const { loading, items, hasNextPage, error, loadMore } = useLoadItems();
	const [error, setError] = useState(undefined);
	const hasNextPage = true;

	// const [items, setItems] = useState(Array.from({ length: 20 }));

	// const fetchMoreData = () => {
	// 	// a fake async api call like which sends
	// 	// 20 more records in 1.5 secs
	// 	setTimeout(() => {
	// 		setItems(items.concat(Array.from({ length: 20 })));
	// 	}, 1500);
	// };
	const [page, setPage] = useState(0);

	const [search_term, setsearch_ter] = useState('');
	const [loading, setLoading] = useState(false);

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
		setError(true);
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

		if (response.data.length < 50) {
			setHasMore(false);
		}
		movies;
		setMovies((movies) => [...movies, ...response.data]);
		console.log(movies);
		setError(undefined);
		// if (response.status === 201) {
		// 	const data = await response.json();
		// 	console.log(data);
		// 	if (data.filename) setPhoto(`/images/${data.filename}`);
		// } else {
		// 	setFileError(true);
		// }
	};

	const incrementPage = async () => {
		console.log('page');
		setPage(page + 1);
		getMoviesTwo();

		// 	setTimeout(() => {
		// 		setItems(items.concat(Array.from({ length: 20 })));
		// 	}, 1500);		console.log('page change ' + page.toString());
	};

	const [infiniteRef] = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore: incrementPage,
		// When there is an error, we stop infinite loading.
		// It can be reactivated by setting "error" state as undefined.
		disabled: !!error,
		// `rootMargin` is passed to `IntersectionObserver`.
		// We can use it to trigger 'onLoadMore' when the sentry comes near to become
		// visible, instead of becoming fully visible on the screen.
		rootMargin: '0px 0px 400px 0px',
	});

	return (
		<>
			{movies &&
				movies.map((movie: Movie) => (
					<div key={movie.id}>
						<>
							<img src={movie.medium_cover_image}></img>
							{movie?.id} {movie.rating}
						</>
					</div>
				))}
			{/* 
              As long as we have a "next page", we show "Loading" right under the list.
              When it becomes visible on the screen, or it comes near, it triggers 'onLoadMore'.
              This is our "sentry".
              We can also use another "sentry" which is separated from the "Loading" component like:
                <div ref={infiniteRef} />
                {loading && <ListItem>Loading...</ListItem>}
              and leave "Loading" without this ref.
          */}
			{hasNextPage && <div ref={infiniteRef}>Loading</div>}
		</>
	);
}

export default SimpleInfiniteList;
