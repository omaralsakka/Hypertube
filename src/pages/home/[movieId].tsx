import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie } from '../../types/appTypes';

const MoviePage = () => {
	const router = useRouter();
	const moviesReducer: Movies = useSelector(
		(state: RootReducer) => state.moviesReducer
	);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();

	let i = 0;
	useEffect(() => {
		i++;
		if (i >= 2 && !moviesReducer.length) {
			window.location.replace('/home');
		}
		if (moviesReducer.length) {
			setMovie(moviesReducer.find((movie) => String(movie.id) === movieId));
		}
	}, [moviesReducer]);

	if (!movie?.id) {
		return <></>;
	} else {
		return (
			<>
				<Container className=" p-sm-4 rounded " fluid>
					<Container
						className="glass-background rounded d-flex flex-column p-0"
						style={{ minWidth: '60vw', minHeight: '85vh' }}
						fluid
					>
						<Container
							className="bg-danger ms-0 p-0"
							style={{
								minWidth: '140px',
								maxWidth: '1280px',
								minHeight: '720px',
								maxHeight: '720px',
							}}
							fluid
						>
							<Container className="overflow-hidden p-0">
								<Image
									className="w-100"
									style={{
										objectFit: 'cover',
										minHeight: '720px',
										maxHeight: '60vh',
									}}
									src={movie.background_image_original}
								/>
							</Container>
						</Container>
					</Container>
				</Container>
			</>
		);
	}
};

export default MoviePage;
