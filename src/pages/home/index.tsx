import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SearchNavBar from '../../components/searchNavBar';
import { Movies } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';

import Row from 'react-bootstrap/Row';
import FilterControls from '../../components/filtercontrols';

const Home = () => {
	const [movies, setMovies] = useState<Movies>();
	const getMovies = async () => {
		const response = await fetch('https://yts.mx/api/v2/list_movies.json');
		const {
			data: { movies },
		} = await response.json();
		return movies;
	};
	useEffect(() => {
		getMovies().then((resp) => setMovies(resp));
	}, []);

	return (
		<>
			<Container className="mb-4">
				<SearchNavBar />
			</Container>
			<Container>
				<FilterControls />
			</Container>

			<Container className="d-flex flex-wrap justify-content-center" fluid>
				{movies &&
					movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
			</Container>
		</>
	);
};

export default Home;