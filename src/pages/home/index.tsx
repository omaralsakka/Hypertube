import { useState, useEffect } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movie } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import FilterControls from '../../components/filtercontrols';
import { useSession } from 'next-auth/react';
import LoadingLogo from '../../components/loadingLogo';
import { trpc } from '../../utils/trpc';
import { flexColCenter, flexRowCenter } from '../../styles/styleVariables';
import axios from 'axios';

const Home = () => {
	const context = trpc.useContext();

	const [loader, setLoader] = useState(true);
	const { data: session, status } = useSession();
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [search_term, setsearch_ter] = useState('');
	const controller = new AbortController();
	const [filterInputs, setFilterInputs] = useState({
		orderBy: 'desc',
		sortBy: 'rating',
		imdbRating: '1',
		genre: '',
		seeds: '1',
		fromYear: '0',
		language: '',
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
			setIsLoading(true);
			try {
				const response = await axios('/api/movie', {
					signal: controller.signal,
					method: 'POST',
					data: {
						search_term,
						fromYear: parseInt(filterInputs.fromYear),
						toYear: parseInt(filterInputs.toYear),
						fromRunTime: parseInt(filterInputs.fromRunTime),
						toRunTime: parseInt(filterInputs.toRunTime),
						imdbRating: parseInt(filterInputs.imdbRating),
						language: filterInputs.language,
						orderBy: filterInputs.orderBy,
						sortBy: filterInputs.sortBy,
						quality: filterInputs.quality,
						seeds: parseInt(filterInputs.seeds),
						description: filterInputs.description,
						genre: filterInputs.genre,
					},
				});
				setMovies(response.data);
			} catch (e) {
				console.log(e);
			}
			setIsLoading(false);
		};
		if (isLoading) {
			controller.abort();
		}
		getMovies();
	}, [filterInputs]);

	const getMovies = async () => {
		setIsLoading(true);
		setMovies([]);
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
				language: filterInputs.language,
				sortBy: filterInputs.sortBy,
				quality: filterInputs.quality,
				seeds: parseInt(filterInputs.seeds),
				description: filterInputs.description,
				genre: filterInputs.genre,
			},
		});
		setMovies(response.data);
		setIsLoading(false);
	};

	const onSearchChange = (e: any) => {
		const { name, value } = e.target;
		setsearch_ter(value);
		getMovies();
		// console.log(name);
		// console.log(value);
	};
	const onFilterChange = (e: any) => {
		setFilterInputs({ ...filterInputs, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);

	return (
		<>
			<Container className="d-flex flex-column" fluid>
				<Container
					className={`${flexColCenter} flex-sm-row border border-light rounded mb-4 mt-4`}
				>
					<div className="searchNavBar mb-sm-0 mb-3">
						<SearchNavBar
							onSearchChange={onSearchChange}
							search_term={search_term}
						/>
					</div>
					<div className="p-0 mb-sm-0 mb-3">
						<FilterControls
							onFilterChange={onFilterChange}
							filterInputs={filterInputs}
						/>
					</div>
				</Container>

				<Container className="d-flex flex-wrap justify-content-center" fluid>
					{isLoading && <LoadingLogo />}
					{!isLoading &&
						movies &&
						movies?.map((movie: Movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								style="homeMovieStyle"
								viewType="full"
							/>
						))}
				</Container>
			</Container>
		</>
	);
};

export default Home;
/*
					) : (
						<>
							<Container className="d-flex flex-column" fluid>
								<Container
									className={`sticky-top ${flexColCenter} flex-sm-row bg-transparent shadow-sm rounded mb-4 mt-4 `}
									style={{ position: 'sticky', zIndex: '1' }}
								>
									<div className="searchNavBar mb-sm-0 mb-3">
										<SearchNavBar
											onSearchChange={onSearchChange}
											search_term={search_term}
										/>
									</div>
									<div className="p-0 mb-sm-0 mb-3">
										<FilterControls
											onFilterChange={onFilterChange}
											filterInputs={filterInputs}
										/>
									</div>
								</Container>
								<Container
									className="d-flex flex-wrap justify-content-center"
									fluid
								>
									{data?.movies.map((movie: Movie) => (
										<MovieCard
											key={movie.id}
											movie={movie}
											style="homeMovieStyle"
											viewType="full"
										/>
									))}
								</Container>
							</Container>
						</>
					)}
					*/
