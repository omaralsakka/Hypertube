import { Card, Container, Row, Col } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import { AiFillStar } from 'react-icons/ai';
import { movieRate } from '../../utils/helperFunctions';
import { useEffect, useState } from 'react';
import { MovieData } from '../../types/appTypes';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useSession } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { TbEyeCheck } from 'react-icons/tb';

const MovieCardOverlay = ({
	movie,
	viewType,
}: {
	movie: Movie;
	viewType: string;
}) => {
	const { t }: i18translateType = useTranslation('common');

	const { data: session } = useSession();
	const { data: watchedMovies } = trpc.movies.getWatchedMovies.useQuery(
		session?.token.user.id
	);
	const [watched, setWatched] = useState(false);

	useEffect(() => {
		if (movie?.id) {
			if (watchedMovies?.movies) {
				watchedMovies.movies.movies.includes(`${movie.id}`) && setWatched(true);
			}
		}
	}, [watchedMovies]);

	return (
		<Card.ImgOverlay className="p-0 d-flex justify-content-center movieCard-OverLay">
			<Container fluid className="movieCard-Body mt-auto p-3 text-dark">
				<Card.Title
					className={`d-flex align-items-center mb-3 ${
						viewType !== 'full' && 'cut-text'
					}`}
				>
					{movie.title}
					{watched && (
						<span className="ms-3">
							<TbEyeCheck />
						</span>
					)}
				</Card.Title>
				<div className="movieOverlay-Info">
					<Row className="g-1 w-75 mb-3">
						<Col>
							<span className="border b-1 px-1 rounded border-dark fs-6">
								{movie?.rating && movieRate(movie.rating?.toString())}
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
							<strong>
								{t('filterControls.' + movie.genres.at(0))
									? t('filterControls.genre.' + movie.genres.at(0))
									: 'N/A'}
								,&nbsp;
								{t('filterControls.' + movie.genres.at(1))
									? t('filterControls.genre.' + movie.genres.at(1))
									: 'N/A'}
							</strong>
						</Card.Text>
					)}
				</div>
			</Container>
		</Card.ImgOverlay>
	);
};

export default MovieCardOverlay;
