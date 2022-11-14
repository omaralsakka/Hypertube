import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movies, Movie } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { useDispatch } from 'react-redux';
import { setMovies } from '../../store/actions';
import FilterControls from '../../components/filtercontrols';
import { useSession } from 'next-auth/react';
import LoadingLogo from '../../components/loadingLogo';
import { trpc } from '../../utils/trpc';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import React, { lazy, Suspense } from 'react';

import axios from 'axios';
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

const Home = () => {
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
	}, [search_term, filterInputs]);

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
		// setError(true);
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
	const displayPage = () => {
		if (movie.id % 50 == 0) {
			<p>
				<b>Pagenumber: {page}</b>
			</p>;
		}
	};
	const renderLoader = () => <p>Loading</p>;

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
			<Container className="d-flex flex-column" fluid>
				{/* {loader ? (
					<LoadingLogo />
				) : ( */}
				<>
					<Container className="mb-4">
						<SearchNavBar
							onSearchChange={onSearchChange}
							search_term={search_term}
						/>
					</Container>
					<Container>
						<FilterControls
							onFilterChange={onFilterChange}
							filterInputs={filterInputs}
						/>
					</Container>

					<Container className="d-flex flex-wrap justify-content-center" fluid>
						<>
							{movies &&
								movies.map(
									(movie: Movie) => (
										(
											<MovieCard
												key={movie.id}
												movie={movie}
												style="homeMovieStyle"
												viewType="full"
											/>
										),
										// <displayPage(movie.id)
									)
								)}

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
					</Container>
				</>
			</Container>
		</>
	);
};

export default Home;

// 	movies.map((movie: Movie) => (

// 	));
// }

// // const [movies, setMoviesState] = useState<Movies>();
// // const dispatch = useDispatch();
// const [loader, setLoader] = useState(true);
// const { data: session, status } = useSession();

// // const getMovies = async () => {
// // 	try {
// // 		const response = await fetch('https://yts.mx/api/v2/list_movies.json');
// // 		const {
// // 			data: { movies },
// // 		} = await response.json();
// // 		return movies;
// // 	} catch (error) {
// // 		console.error(error);
// // 		return false;
// // 	}
// // };

// // useEffect(() => {
// // 	getMovies().then((resp) => {
// // 		if (resp) {
// // 			setMoviesState(resp);
// // 			dispatch(setMovies(resp));
// // 		}
// // 	});
// // }, []);

// // useEffect(() => {
// // 	setTimeout(() => {
// // 		setLoader(false);
// // 	}, 3000);
// // }, []);

// const [search_term, setsearch_ter] = useState('');
// let moviesData = [];

// const [filterInputs, setFilterInputs] = useState({
// 	orderBy: 'desc',
// 	sortBy: 'rating',
// 	imdbRating: '1',
// 	genre: 'Horror',
// 	seeds: '1',
// 	fromYear: '0',
// 	toYear: '2021',
// 	search_term,
// 	fromRunTime: '0',
// 	toRunTime: '300',
// 	limit: '50',
// 	description: '',
// 	quality: '720p',
// });

// const { data, error } = trpc.movie.search.useQuery({
// 	search_term,
// 	fromYear: parseInt(filterInputs.fromYear),
// 	toYear: parseInt(filterInputs.toYear),
// 	fromRunTime: parseInt(filterInputs.fromRunTime),
// 	toRunTime: parseInt(filterInputs.toRunTime),
// 	imdbRating: parseInt(filterInputs.imdbRating),
// 	orderBy: filterInputs.orderBy,
// 	sortBy: filterInputs.sortBy,
// 	quality: filterInputs.quality,
// 	seeds: parseInt(filterInputs.seeds),
// 	description: filterInputs.description,
// 	genre: filterInputs.genre,
// });

// const onSearchChange = (e: any) => {
// 	const { name, value } = e.target;
// 	setsearch_ter(value);
// 	// console.log(name);
// 	// console.log(value);
// };

// const onFilterChange = (e: any) => {
// 	setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
// };
