import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Container, Card, Row, Col, Collapse, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useState } from 'react';
import { Movies, Movie, MovieData } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { movieRate, getOmdb } from '../../utils/helperFunctions';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { trpc } from '../../utils/trpc';
import CommentsSection from '../../components/commentsSection';
import axios from 'axios';

const streamMovie = (movie: Movie | undefined) => {
	// THIS CHANGE IS IMPORTANT
	const response = fetch('/api/video/', {
		method: 'POST',
		body: JSON.stringify(movie),
	});
};
import { getMovie, getSuggestedMovies } from '../../services/ytsServices';

const MoviePage = () => {
	const router = useRouter();
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: parseInt(router.query.movieId as string),
	});

	useEffect(() => {
		// setComments(data.comments as any);
		if (data) {
			console.log(data.comments);
			setComments(data.comments as any);
		}
	}, [data]);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setLoading] = useState(false);
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const [openDescription, setOpenDescription] = useState(false);
	const [movieUrl, setMovieUrl] = useState('');
	const [movieInfo, setMovieInfo] = useState({
		imdb_code: '',
		movie_path: '',
		size: 0,
	}); // THIS IS NEEDED TO PASS INFO TO API
	// this is forced comments to display for now till we got real backend comments
	const [comments, setComments] = useState([]);
	const suggestedMovieStyle = {
		maxWidth: '10vw',
		width: '200px',
		minWidth: '5vw',
	};

	useEffect(() => {
		if (movieId?.length) {
			getMovie(movieId).then((resp) => {
				if (!resp.id) {
					window.location.replace('/home');
				} else {
					setMovie(resp);
				}
			});
		}
	}, [movieId]);

	useEffect(() => {
		if (movie?.id) {
			getOmdb(movie).then((resp) => setMovieData(resp));
			getSuggestedMovies(movie.id).then(
				(resp) => resp && setSuggestedMovies(resp)
			);
		}
	}, [movie]);
	useEffect(() => {
		if (movieInfo.imdb_code.length) {
			setMovieUrl(
				`/api/stream?imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
			);
		}
	}, [isLoading]);
	const handleClick = () => {
		// THESE CHANGES ARE IMPORTANT
		axios.post('/api/video/', movie).then((resp) => {
			setMovieInfo(resp.data.data);
			setLoading(true);
		});
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMovieUrl(
				`/api/stream?            imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
			);
		}, 500);
		return () => clearTimeout(timeout);
	}, [movieInfo]);

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
					<Container className=" p-sm-4 rounded" fluid>
						<Card
							className="glass-background rounded d-flex flex-column p-0 border-0"
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
												<Container className="d-flex flex-wrap justify-content-center w-75">
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
										<Row className="mb-3">
											<Col>
												<Card.Title className="mb-4 fs-5 d-flex align-items-center p-0">
													{movieData?.Year}
													<span className="mx-3 border b-1 p-1 rounded border-dark fs-6">
														{movieRate(movieData?.Rated)}
													</span>
													<span>{movieData?.Runtime}</span>
												</Card.Title>
											</Col>
										</Row>
										<Container className="ms-0 p-0 mb-3" fluid>
											<Button
												variant="transparent"
												onClick={() => setOpenDescription(!openDescription)}
												aria-controls="description-section"
												aria-expanded={openDescription}
											>
												Read more
											</Button>
										</Container>
										<Collapse in={openDescription}>
											<Row id="description-section">
												<Col>
													<Row className="mb-3">
														<Card.Title className="fs-3">Plot</Card.Title>
														<Card.Text style={{ color: '#333' }}>
															{movieData?.Plot}
														</Card.Text>
													</Row>
													<Row>
														<div className="d-flex align-items-center mb-1">
															<Card.Title className="m-0 p-0">Imdb:</Card.Title>
															<Card.Text className="fs-5 ms-1">
																{movieData?.imdbRating}
															</Card.Text>
														</div>
														<div className="d-flex align-items-center ">
															<Card.Title className="m-0 p-0">
																Country:
															</Card.Title>
															<Card.Text className="fs-5 ms-1">
																{movieData?.Country}
															</Card.Text>
														</div>
													</Row>
												</Col>
												<Col>
													<Row className="mb-3">
														<Card.Title>
															<span>Actors:</span>{' '}
															<strong>{movieData?.Actors}</strong>
														</Card.Title>
														<Card.Title>
															<span>Director:</span>{' '}
															<strong>{movieData?.Director}</strong>
														</Card.Title>{' '}
													</Row>
													<Row>
														<Card.Title>
															<span>Category:</span>{' '}
															<strong>{movieData?.Genre}</strong>
														</Card.Title>{' '}
														<Card.Title>
															<span>Language:</span>{' '}
															<strong>{movieData?.Language}</strong>
														</Card.Title>
													</Row>
												</Col>
											</Row>
										</Collapse>
										<hr />
										{comments && (
											<Row>
												<Col>
													<CommentsSection comments={comments} />
												</Col>
											</Row>
										)}
									</Container>
								</Container>
							</Card.Body>
						</Card>
					</Container>
					{isLoading ? ( // THIS HAS TO BE SAVED FOR A BASE MODEL FOR THE FUTURE REACT PLAYER OR ATLEAST THE SRC PATH STRING
						<ReactPlayer
							url={movieUrl}
							controls={true}
							playing={true}
							width="75%"
							height="75%"
						/>
					) : (
						<></>
					)}
				</motion.div>
			</>
		);
	}
};

export default MoviePage;
