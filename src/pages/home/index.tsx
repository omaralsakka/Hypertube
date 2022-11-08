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

const Home = () => {
	const [movies, setMoviesState] = useState<Movies>();
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(true);
	const { data: session, status } = useSession();

	const getMovies = async () => {
		try {
			const response = await fetch('https://yts.mx/api/v2/list_movies.json');
			const {
				data: { movies },
			} = await response.json();
			return movies;
		} catch (error) {
			console.error(error);
			return false;
		}
	};

	useEffect(() => {
		getMovies().then((resp) => {
			if (resp) {
				setMoviesState(resp);
				dispatch(setMovies(resp));
			}
		});
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 3000);
	}, []);
	return (
		<>
			<Container className="d-flex flex-column" fluid>
				{loader ? (
					<LoadingLogo />
				) : (
					<>
						{' '}
						<Container className="mb-4">
							<SearchNavBar />
						</Container>
						<Container>{/* <FilterControls /> */}</Container>
						<Container
							className="d-flex flex-wrap justify-content-center"
							fluid
						>
							{movies &&
								movies.map((movie: Movie) => (
									<MovieCard
										key={movie.id}
										movie={movie}
										style="homeMovieStyle"
										viewType="full"
									/>
								))}
						</Container>
					</>
				)}
			</Container>
		</>
	);
};

export default Home;
