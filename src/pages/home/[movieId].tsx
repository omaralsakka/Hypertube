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
import { TrackProps } from 'react-player/file';

const MoviePage = () => {
	const router = useRouter();
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [isLoading, setLoading] = useState(false);
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const [openDescription, setOpenDescription] = useState(false);
	const [movieUrl, setMovieUrl] = useState('');
	const [subtitles, setSubtitles] = useState([]); // type this bad bwoe
	const [movieInfo, setMovieInfo] = useState({
		imdb_code: '',
		movie_path: '',
		size: 0,
	}); // THIS IS NEEDED TO PASS INFO TO API
	// this is forced comments to display for now till we got real backend comments
	const [comments, setComments] = useState([
		{
			id: '10',
			userId: '10',
			userName: 'test1',
			date: '20.10.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '11',
			userId: '11',
			userName: 'test442',
			date: '20.11.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '12',
			userId: '12',
			userName: 'test96',
			date: '20.12.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '13',
			userId: '13',
			userName: 'test86',
			date: '20.01.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '15',
			userId: '15',
			userName: 'test5',
			date: '20.02.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '16',
			userId: '16',
			userName: 'test4',
			date: '20.03.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '17',
			userId: '17',
			userName: 'test3',
			date: '20.04.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '18',
			userId: '18',
			userName: 'test2',
			date: '20.05.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '19',
			userId: '19',
			userName: 'test10',
			date: '20.06.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '20',
			userId: '20',
			userName: 'test12',
			date: '25.10.2022',
			comment: 'This movie is cool!!',
		},
		{
			id: '23',
			userId: '23',
			userName: 'test13',
			date: '12.10.2022',
			comment: 'This movie is cool!!',
		},
	]);
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

	const handleClick = async () => {
		// THESE CHANGES ARE IMPORTANT
		const result = await axios.post('/api/video/', movie);
		setMovieInfo(result.data.data);
		if (movie) {
			const subsArray = await axios.get('/api/subtitles/', {
				imdbCode: movie.imdb_code,
			});

			console.log(subsArray.data);

			setSubtitles(subsArray.data);
			setLoading(true); // think if this has to be outside
		}
		//setLoading(true);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMovieUrl(
				`/api/stream?imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
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
										<Container className="ms-0 mb-3" fluid>
											<Button
												variant="warning"
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
					{isLoading ? (
						<ReactPlayer
							url={movieUrl}
							controls={true}
							playing={true}
							width="75%"
							height="75%"
							config={{
								file: {
									tracks: subtitles,
								},
							}}
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
