import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie, MovieData } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { getOmdb } from '../../utils/helperFunctions';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CommentsSection from '../../components/commentsSection';
import MovieInfo from '../../components/movieInfo';
import { getSuggestedMovies } from '../../services/ytsServices';

const MoviePage = () => {
	const router = useRouter();
	const moviesReducer: Movies = useSelector(
		(state: RootReducer) => state.moviesReducer
	);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setLoading] = useState(false);
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	// this is forced comments to display for now till we got real backend comments
	const [comments, setComments] = useState([
		{
			id: '10',
			userName: 'test1',
			date: '20.10.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '11',
			userName: 'test442',
			date: '20.11.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '12',
			userName: 'test96',
			date: '20.12.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '13',
			userName: 'test86',
			date: '20.01.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '15',
			userName: 'test5',
			date: '20.02.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '16',
			userName: 'test4',
			date: '20.03.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '17',
			userName: 'test3',
			date: '20.04.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '18',
			userName: 'test2',
			date: '20.05.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '19',
			userName: 'test10',
			date: '20.06.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '20',
			userName: 'test12',
			date: '25.10.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '23',
			userName: 'test13',
			date: '12.10.2022',
			comment: 'This movie is cool!!',
		},
	]);
	let i = 0;

	const suggestedMovieStyle = {
		maxWidth: '10vw',
		width: '180px',
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
	}, [moviesReducer, movieId]);

	useEffect(() => {
		if (movie?.id) {
			getOmdb(movie).then((resp) => setMovieData(resp));
			getSuggestedMovies(movie.id).then(
				(resp) => resp && setSuggestedMovies(resp)
			);
		}
	}, [movie]);

	const handleClick = () => {
		setLoading(true);
		streamMovie();
	};
	const streamMovie = () => {
		const response = fetch('/api/video/', {
			method: 'POST',
			body: JSON.stringify(movie),
		});
	};

	if (!movie?.id) {
		return <></>;
	} else {
		return (
			<>
				<motion.div
					initial={{ y: 10, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -10, opacity: 0 }}
					transition={{ duration: 0.8 }}
				>
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
												<Card style={{ minHeight: '720px', maxHeight: '60vh' }}>
													<Card.Img
														className="overflow-hidden"
														style={{
															objectFit: 'cover',
															minHeight: '720px',
															maxHeight: '60vh',
														}}
														src={movie.background_image_original}
													/>
													<Card.ImgOverlay>
														{!isLoading && (
															<Container className="d-flex justify-content-center align-items-center h-100">
																<Button
																	variant="primary"
																	hidden={isLoading}
																	onClick={!isLoading && handleClick}
																>
																	<FaPlay />
																</Button>
															</Container>
														)}
													</Card.ImgOverlay>
												</Card>
											</Container>
										</Col>
										<Col sm={5} className="p-1">
											<Container className="d-flex flex-column justify-content-center align-items-center">
												<Card.Title className="fs-2 mb-4 text-dark">
													Suggested movies
												</Card.Title>
												<Container className="d-flex flex-wrap justify-content-center">
													{suggestedMovies?.map((movie) => (
														<div key={movie.id} className="fadeInAnimated">
															<MovieCard
																movie={movie}
																style={suggestedMovieStyle}
																viewType="small"
															/>
														</div>
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
									<Container className="mt-2 mb-3" fluid>
										<MovieInfo movieData={movieData} />
										<hr />
										<Row>
											<Col>
												<CommentsSection comments={comments} />
											</Col>
										</Row>
									</Container>
								</Container>
							</Card.Body>
						</Card>
					</Container>
				</motion.div>
			</>
		);
	}
};

export default MoviePage;
