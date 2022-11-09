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
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const Home = () => {
	const [movies, setMoviesState] = useState<Movies>();
	const dispatch = useDispatch();
	const [loader, setLoader] = useState(true);
	const { data: session, status } = useSession();
	const router = useRouter();
	const utils = trpc.useContext();
	// We need user data from db because session doesn't update until logging in again
	const { isLoading, isError, data, error, isSuccess } = trpc.user.get.useQuery(
		{ id: session?.token?.user?.id ? session?.token?.user?.id : '0'},
		{
			placeholderData: { id: '', name: 'Name', email: 'Email', password: '' },
		}
	);
	
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

	// Redirect on first login
	useEffect(() => {
		console.log(data)
		if (!data?.user?.firstLogin || !router.isReady) return
		const redirect = async() => {
			console.log('redirecting to /signup-image')
			router.replace('/signup-image');
		}
		redirect()
	}, [data, router.isReady]);
	
	return (
		<>
			<Container className="d-flex flex-column" fluid>
				{loader ? (
					<LoadingLogo />
				) : (
					<>
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
