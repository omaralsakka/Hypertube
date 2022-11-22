import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { Movies, Movie, MovieData, MoviePostInfo } from '../../types/appTypes';
import MovieCard from '../../components/moviecard';
import { movieRate, getOmdb } from '../../utils/helperFunctions';
import { motion } from 'framer-motion';
import { trpc } from '../../utils/trpc';
import CommentsSection from '../../components/commentsSection';
import MovieDescription from '../../components/MovieDescription';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useSession } from 'next-auth/react';
import { getMovie, getSuggestedMovies } from '../../services/ytsServices';
import MovieScreen from '../../components/MovieScreen';
import LoadingLogo from '../../components/loadingLogo';

const MoviePage = () => {
	const router = useRouter();
	const { t }: i18translateType = useTranslation('common');
	const { data, error } = trpc.comment.getMovieComments.useQuery({
		imdb_code: parseInt(router.query.movieId as string),
	});
	const { status } = useSession();

	//TRPCClientError!router.isReady
	// useEffect(() => {
	// 	// setComments(data.comments as any);

	// 	if (data) {
	// 		setComments(data.comments as any);
	// 	}
	// }, [data]);
	const movieId = router.query.movieId;
	const [movie, setMovie] = useState<Movie>();
	const [movieData, setMovieData] = useState<MovieData>();
	const [suggestedMovies, setSuggestedMovies] = useState<Movies>();
	const [movieUrl, setMovieUrl] = useState('');
	const [subtitles, setSubtitles] = useState([]); // type this bad bwoe
	const [movieInfo, setMovieInfo] = useState<MoviePostInfo>({
		imdb_code: '',
		movie_path: '',
		size: 0,
	}); // THIS IS NEEDED TO PASS INFO TO API
	// this is forced comments to display for now till we got real backend comments
	const [comments, setComments] = useState([]);

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
		if (status !== 'loading' && status !== 'authenticated') {
			window.location.replace('/');
		}
	}, [status]);

	if (!movie?.id) {
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
											movie={movie}
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
										<MovieDescription movieData={movieData} />
										<hr />
										{comments && (
											<Row>
												<Col>
													<CommentsSection
														imdb_code={parseInt(router.query.movieId as string)}
													/>
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

MoviePage.getInitialProps = async () => {
	return {};
};
