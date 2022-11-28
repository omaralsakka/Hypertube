import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import {
	Movies,
	Movie,
	MovieData,
	MoviePostInfo,
	Cast,
	Crew,
} from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import SuggestionCard from '../../components/suggestionCard';
import { motion } from 'framer-motion';
import { trpc } from '../../utils/trpc';
import { getSuggestedMovies } from '../../services/ytsServices';
import CommentsSection from '../../components/commentsSection';
import MovieDescription from '../../components/MovieDescription';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { movieRate, getOmdb } from '../../utils/helperFunctions';

const MovieDB = require('moviedb')('99bfb76d8c47a3cb8112f5bf4e6bdd4d');

const streamMovie = (movie: Movie | undefined) => {
	// THIS CHANGE IS IMPORTANT
	const response = fetch('/api/video/', {
		method: 'POST',
		body: JSON.stringify(movie),
	});
};

import MovieScreen from '../../components/MovieScreen';
import LoadingLogo from '../../components/loadingLogo';

const MoviePage = () => {
	const router = useRouter();
	const [movie, setMovie] = useState<Movie>();
	const imdb_code = router.query.imdb_code;
	const { t }: i18translateType = useTranslation('common');
	const { status } = useSession();

	// const [movieData, setMovieData] = useState<Movie>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const [recommendMovies, setRecommendMovies] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [movieUrl, setMovieUrl] = useState('');
	const [crew, setCrew] = useState<any>([]);
	const [subtitles, setSubtitles] = useState([]); // type this bad bwoe

	const [movieInfo, setMovieInfo] = useState<MoviePostInfo>({
		imdb_code: '',
		movie_path: '',
		size: 0,
	}); // THIS IS NEEDED TO PASS INFO TO API

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`/api/movie-metadata?imdb_code=${imdb_code}`
			);
			if (!response.data) {
				window.location.replace('/home');
			} else {
				setMovie(response.data);
			}
		};
		if (imdb_code) {
			fetchData();
		}
	}, [imdb_code]);

	useEffect(() => {
		const fetchData = async () => {
			MovieDB.movieCredits({ id: movie?.imdb_code }, (err: any, res: any) => {
				setCrew(res);
			});
		};
		if (movie?.id) {
			fetchData();
		}
	}, [movie]);

	useEffect(() => {
		if (movie?.id) {
			getSuggestedMovies(movie.id).then(
				(resp) => resp && setSuggestedMovies(resp)
			);
		}
	}, [movie]);

	useEffect(() => {
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);

	useEffect(() => {
		const fetchData = async () => {
			MovieDB.movieSimilar({ id: movie?.imdb_code }, (err: any, res: any) => {
				setRecommendMovies(res.results);
			});
		};
		if (movie?.id) {
			fetchData();
		}
	}, [movie]);

	const handleClick = async () => {
		// THESE CHANGES ARE IMPORTANT
		const result = await axios.post('/api/video/', movie);
		setMovieInfo(result.data.data);
		if (movie) {
			const subsArray = await axios.get(
				`/api/subtitles?imdbCode=${movie.imdb_code}`,
				{}
			);
			setSubtitles(subsArray.data);
			setLoading(true);
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMovieUrl(
				`/api/stream?imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
			);
		}, 500);
		return () => clearTimeout(timeout);
	}, [movieInfo]);

	if (!movie) {
		return (
			<>
				<LoadingLogo />
			</>
		);
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
										<MovieScreen
											movie={movie as Movie}
											movieInfo={movieInfo}
											setMovieUrl={setMovieUrl}
											setMovieInfo={setMovieInfo}
											movieUrl={movieUrl}
										/>
										<Col sm={5} className="p-1">
											<Container className="d-flex flex-column justify-content-center align-items-center">
												<Card.Title className="fs-2 mb-4 text-dark">
													{t('movieInfo.suggested')}
												</Card.Title>
												<Container className="d-flex flex-wrap justify-content-center w-75">
													{suggestedMovies?.map((movie) => (
														<div key={movie.id} className="fadeInAnimated">
															<MovieCard
																movie={movie}
																style="suggestedMovieStyle"
																viewType="small"
															/>
														</div>
													))}
													{/* {recommendMovies &&
														recommendMovies
															?.filter((item: any, index: any) => index < 6)
															.map((movie: any) => (
																<div key={movie.id} className="fadeInAnimated">
																	<SuggestionCard
																		movie={movie}
																		style="suggestedMovieStyle"
																		viewType="small"
																	/>
																</div>
															))} */}
												</Container>
											</Container>
										</Col>
									</Row>
								</Container>
								<Container className="text-dark" fluid>
									<Card.Title className="display-6 mt-3 ">
										<strong>{movie?.title}</strong>
									</Card.Title>
									<Container className="mt-2 mb-3" fluid>
										<Row className="mb-3">
											<Col>
												<Card.Title className="mb-4 fs-5 d-flex align-items-center p-0">
													{movie?.year}
													<span className="mx-3 border b-1 p-1 rounded border-dark fs-6">
														{movieRate(movie?.rating.toString())}
													</span>
													<span>{movie?.runtime}</span>
												</Card.Title>
											</Col>
										</Row>
										<MovieDescription
											movie={movie}
											crew={crew.crew as Array<Crew>}
											cast={crew.cast as Array<Cast>}
										/>
										<hr />
										{
											<Row>
												<Col>
													<CommentsSection
														imdb_code={router.query.imdb_code as string}
													/>
												</Col>
											</Row>
										}
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

MoviePage.getInitialProps = async () => {
	return {};
};
