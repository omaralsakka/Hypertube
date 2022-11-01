import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movies } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { useDispatch } from 'react-redux';
import { setMovies } from '../../store/actions';
import FilterControls from '../../components/filtercontrols';
import { signOut, useSession } from 'next-auth/react';

const Home = () => {
	const [movies, setMoviesState] = useState<Movies>();
	const dispatch = useDispatch();
	const homeMovieStyle = {
		maxWidth: '20vw',
		minWidth: '15vw',
		maxHeight: '61vh',
	};
	const getMovies = async () => {
		const response = await fetch('https://yts.mx/api/v2/list_movies.json');
		const {
			data: { movies },
		} = await response.json();
		return movies;
	};
	useEffect(() => {
		getMovies().then((resp) => {
			setMoviesState(resp);
			dispatch(setMovies(resp));
		});
	}, []);
	const { data: session, status } = useSession();

	return (
		<>
			<Container className="mb-4">
				<SearchNavBar />
			</Container>
			<Container>{/* <FilterControls /> */}</Container>

			{status === 'authenticated' ? (<div>
				<p>Signed in as {session.user?.email}</p>
				<button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button>
			</div>
			) : (
				<a href="/auth/signin">Sign in</a>
			)}

			<Container className="d-flex flex-wrap justify-content-center" fluid>
				{movies &&
					movies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							style={homeMovieStyle}
							viewType="full"
						/>
					))}
			</Container>
		</>
	);
};

export default Home;
