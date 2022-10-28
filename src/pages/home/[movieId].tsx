import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Image, Card, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie, MovieData } from '../../types/appTypes';
import axios from 'axios';
import MovieCard from '../../components/moviecard';

const MoviePage = () => {
	const router = useRouter();
	const moviesReducer: Movies = useSelector(
		(state: RootReducer) => state.moviesReducer
	);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const getOmdb = async (movie: Movie) => {
		const baseUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=3412b01c&t=${movie.title_english}&y=${movie.year}`;
		const resp = await axios.get(baseUrl);
		return resp.data;
	};
	let i = 0;
	const suggestedMovieStyle = {
		maxWidth: '10vw',
		width: '150px',
		minWidth: '5vw',
	};

	useEffect(() => {
		i++;
		if (i >= 2 && !moviesReducer.length) {
			window.location.replace('/home');
		}
		if (moviesReducer.length) {
			setMovie(moviesReducer.find((movie) => String(movie.id) === movieId));
		}
	}, [moviesReducer]);

	useEffect(() => {
		if (movie?.id) {
			getOmdb(movie).then((resp) => setMovieData(resp));
			setSuggestedMovies(moviesReducer.slice(0, 6));
		}
	}, [movie]);
	if (!movie?.id) {
		return <></>;
	} else {
		return (
			<>
				<Container className=" p-sm-4 rounded " fluid>
					<Card
						className="glass-background rounded d-flex flex-column p-0"
						style={{ minWidth: '60vw', minHeight: '85vh' }}
					>
						<Card.Body className="p-0">
							<Container className="p-0" fluid>
								<Row className="d-flex g-0 m-auto justify-content-center">
									<Col sm={7}>
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
									</Col>
									<Col className="p-3">
										<Container className="d-flex flex-column justify-content-center align-items-center w-75">
											<Card.Title className="fs-2 mb-5 text-dark">
												<strong>Suggested movies</strong>
											</Card.Title>
											<Container className="d-flex flex-wrap justify-content-center">
												{suggestedMovies?.map((movie) => (
													<MovieCard
														key={movie.id}
														movie={movie}
														style={suggestedMovieStyle}
													/>
												))}
											</Container>
										</Container>
									</Col>
								</Row>
							</Container>
							<Container className="text-dark" fluid>
								<Card.Title className="display-6 mt-3 ">
									<strong>{movieData?.Title}</strong>
								</Card.Title>
							</Container>
						</Card.Body>
					</Card>
				</Container>
			</>
		);
	}
};

export default MoviePage;
