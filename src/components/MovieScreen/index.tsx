import MoviePlayer from '../MoviePlayer';
import { Card, Col, Button, Spinner, Container } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviePostInfo } from '../../types/appTypes';

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

	useEffect(() => {
		if (movieInfo.imdb_code.length) {
			setMovieUrl(
				`/api/stream?imdbCode=${movieInfo.imdb_code}&path=${movieInfo.movie_path}&size=${movieInfo.size}`
			);
		}
	}, [isLoading]);

	const handleClick = () => {
		setIsSpinner(true);
		axios.post('/api/video/', movie).then((resp) => {
			setMovieInfo(resp.data.data);
			setIsLoading(true);
		});
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
							<MoviePlayer movieUrl={movieUrl} />
						) : (
							<Card.ImgOverlay>
								<Container className="d-flex justify-content-center align-items-center h-100">
									{isSpinner ? (
										<Spinner animation="border" variant="warning" />
									) : (
										<Button
											variant="primary"
											onClick={!isLoading && handleClick}
										>
											<FaPlay />
										</Button>
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
