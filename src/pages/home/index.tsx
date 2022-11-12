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
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useQueryClient, QueryClientProvider } from '@tanstack/react-query';
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
	// const [movies, setMoviesState] = useState<Movies>();
	// const dispatch = useDispatch();
	const context = trpc.useContext();

	const [loader, setLoader] = useState(true);
	const { data: session } = useSession();
	const [movies, setMovies] = useState([]);
	// const getMovies = async () => {
	// 	try {
	// 		const response = await fetch('https://yts.mx/api/v2/list_movies.json');
	// 		const {
	// 			data: { movies },
	// 		} = await response.json();
	// 		return movies;
	// 	} catch (error) {
	// 		console.error(error);
	// 		return false;
	// 	}
	// };

	// useEffect(() => {
	// 	getMovies().then((resp) => {
	// 		if (resp) {
	// 			setMoviesState(resp);
	// 			dispatch(setMovies(resp));
	// 		}
	// 	});
	// }, []);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setLoader(false);
	// 	}, 3000);
	// }, []);
	const [search_term, setsearch_ter] = useState('');

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
		getMovies();
	}, [filterInputs]);

	// const {
	// 	data,
	// 	error,
	// 	isError,
	// 	isFetching,
	// 	isLoading,
	// 	isStale,
	// 	status,
	// 	fetchStatus,
	// 	isLoadingError,
	// 	isRefetchError,
	// 	isRefetching,
	// } = trpc.movie.search.useQuery(
	// 	{
	// search_term,
	// fromYear: parseInt(filterInputs.fromYear),
	// toYear: parseInt(filterInputs.toYear),
	// fromRunTime: parseInt(filterInputs.fromRunTime),
	// toRunTime: parseInt(filterInputs.toRunTime),
	// imdbRating: parseInt(filterInputs.imdbRating),
	// orderBy: filterInputs.orderBy,
	// sortBy: filterInputs.sortBy,
	// quality: filterInputs.quality,
	// seeds: parseInt(filterInputs.seeds),
	// description: filterInputs.description,
	// genre: filterInputs.genre,
	// 	},
	// 	{
	// 		onSuccess: () => {
	// 			console.log('Get data!');
	// 			console.log(data); // undefined
	// 		},
	// 		onError: () => {
	// 			console.log('Errored');
	// 		},
	// 		onSettled: () => {
	// 			console.log('settles');
	// 		},
	// 		// refetchOnMount: true,
	// 		// staleTime: 5000,
	// 		// // refetchInterval: 5000,
	// 		cacheTime: 0,
	// 		staleTime: Infinity,
	// 		retry: false,
	// 		// staleTime: 1000,
	// 		refetchInterval: 1000,
	// 		refetchIntervalInBackground: true,
	// 		structuralSharing: false,
	// 		// networkMode: 'always',
	// 		// keepPreviousData: true,
	// 	}
	// );
	// console.log('fetch status: ' + fetchStatus);
	// console.log('is stale: ' + isStale);
	// console.log('is refetching: ' + isRefetching);
	// useEffect(() => {
	// 	// if (data) {
	// 	// 	// mutate data if you need to
	// 	// 	setMovies(data.movies);
	// 	console.log('refetch');
	// }, [isRefetching]);
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

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
		getMovies();
		// console.log(name);
		// console.log(value);
	};
	const queryClient = useQueryClient();

	const onFilterChange = (e: any) => {
		console.log('change');
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
		// getMovies();
		// context.invalidate();
	};

	return (
		<>
			<QueryClientProvider client={queryClient}>
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

						<Container
							className="d-flex flex-wrap justify-content-center"
							fluid
						>
							{movies &&
								movies?.map((movie: Movie) => (
									<MovieCard
										key={movie.id}
										movie={movie}
										style="homeMovieStyle"
										viewType="full"
									/>
								))}
						</Container>
					</>
				</Container>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</>
	);
};

export default Home;
