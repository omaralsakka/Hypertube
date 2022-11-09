import { Card, Container, Row, Col } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import { AiFillStar } from 'react-icons/ai';
import { movieRate } from '../../utils/helperFunctions';
import { useEffect, useState } from 'react';
import { getOmdb } from '../../utils/helperFunctions';
import { MovieData } from '../../types/appTypes';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const MovieCardOverlay = ({
	movie,
	viewType,
}: {
	movie: Movie;
	viewType: string;
}) => {
	const [movieData, setMovieData] = useState<MovieData>();
	const { t }: i18translateType = useTranslation('common');

	useEffect(() => {
		movie?.id && getOmdb(movie).then((resp) => setMovieData(resp));
	}, []);

	return (
		<Card.ImgOverlay className="p-1 d-flex justify-content-center movieCard-OverLay">
			<Container fluid className="movieCard-Body mt-auto p-3 text-dark">
				<Card.Title className={`mb-3 ${viewType !== 'full' && 'cut-text'}`}>
					{movie.title}
				</Card.Title>
				<div className="movieOverlay-Info">
					<Row className="g-0 w-75 mb-3 ">
						<Col>
							<span className="border b-1 px-1 rounded border-dark fs-6">
								{movieRate(movieData?.Rated)}
							</span>
						</Col>
						{viewType === 'full' && (
							<>
								<Col>
									<strong>{movie.year}</strong>
								</Col>
								<Col className="d-flex align-items-center">
									<strong className="ms-1">{movie.rating}</strong>
									<AiFillStar style={{ color: 'yellow' }} />
								</Col>
							</>
						)}
					</Row>
					{viewType === 'full' && (
						<Card.Text>
							{t('movieInfo.category')}:{' '}
							<strong>{movie.genres.at(0) ? movie.genres.at(0) : 'N/A'}</strong>
						</Card.Text>
					)}
				</div>
			</Container>
		</Card.ImgOverlay>
	);
};

export default MovieCardOverlay;
