import MoviePlayer from '../MoviePlayer';
import { Card, Col, Button, Spinner, Container } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviePostInfo } from '../../types/appTypes';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { RiContactsBookLine } from 'react-icons/ri';
import { deleteFiles } from '../../utils/cron-deleteFiles';

const MovieScreen = ({
	movie,
	movieInfo,
	setMovieUrl,
	setMovieInfo,
	movieUrl,
}: {
	movie: Movie;
	movieInfo: MoviePostInfo;
	setMovieUrl: React.Dispatch<React.SetStateAction<string>>;
	setMovieInfo: React.Dispatch<React.SetStateAction<MoviePostInfo>>;
	movieUrl: string;
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSpinner, setIsSpinner] = useState(false);
	const [subtitles, setSubtitles] = useState([]);
	const [isMp4, setIsMp4] = useState(true);
	const { data: session } = useSession();
	const mutation = trpc.movies.setMovieAsWatched.useMutation();
	const mutationUpdateDate = trpc.movies.updateMovieDate.useMutation();
	deleteFiles();
	useEffect(() => {
		const timeout = setTimeout(() => {
			setMovieUrl(
				`/api/stream?imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
			);

			if (
				movieInfo.movie_path.includes('YIFY') ||
				movieInfo.movie_path.includes('.mkv')
			) {
				setIsMp4(false);
			}
		}, 1000);
		return () => clearTimeout(timeout);
	}, [movieInfo]);

	const handleClick = async () => {
		setIsSpinner(true);
		if (movie) {
			const result = await axios.post('/api/video/', movie);
			setMovieInfo(result.data.data);
			const subsArray = await axios.get(
				`/api/subtitles?imdbCode=${movie.imdb_code}`
			);
			if (subsArray) {
				setSubtitles(subsArray.data);
			} else {
				setSubtitles([]);
			}
			try {
				mutationUpdateDate.mutate({
					imdbCode: result.data.data.imdb_code,
				});
			} catch (err) {
				console.error(err);
			}
			setIsLoading(true);
			const userId: string = session?.token.user.id.toString();
			const movieId: string = movie.id.toString()
			try {
				mutation.mutate({
					user_id: userId,
					movie_id: movieId,
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<>
			<Col sm={7}>
				<Container className="overflow-hidden p-0">
					<Card style={{ minHeight: '720px', maxHeight: '60vh' }}>
						{!isLoading && (
							<Card.Img
								className="overflow-hidden"
								style={{
									objectFit: 'cover',
									minHeight: '720px',
									maxHeight: '60vh',
								}}
								src={movie.background_image_original}
							/>
						)}
						{isLoading ? (
							<MoviePlayer
								movieUrl={movieUrl}
								subtitles={subtitles}
								isMp4={isMp4}
							/>
						) : (
							<Card.ImgOverlay>
								<Container className="d-flex justify-content-center align-items-center h-100">
									{isSpinner ? (
										<Spinner animation="border" variant="warning" />
									) : (
										<motion.div
											className="box"
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.9 }}
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 17,
											}}
										>
											<Button
												className="d-flex align-items-center p-3 rounded-pill"
												variant="primary"
												onClick={!isLoading && handleClick}
											>
												<FaPlay />
											</Button>
										</motion.div>
									)}
								</Container>
							</Card.ImgOverlay>
						)}
					</Card>
				</Container>
			</Col>
		</>
	);
};

export default MovieScreen;
