import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Movies, Movie, MovieData } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { getOmdb } from '../../utils/helperFunctions';
import { FaPlay } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { trpc } from '../../utils/trpc';
import CommentsSection from '../../components/commentsSection';
import MovieInfo from '../../components/movieInfo';
import { getMovie, getSuggestedMovies } from '../../services/ytsServices';

const MoviePage = () => {
	const router = useRouter();
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: 46321,
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
										<MovieInfo movieData={movieData} />
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
				</motion.div>
			</>
		);
	}
};

export default MoviePage;
