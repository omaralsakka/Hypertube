import { useEffect, useState } from 'react';

const Home = () => {
	const [movies, setMovies] = useState();
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
	return <></>;
};

export default Home;
