import { MovieData } from '../../types/appTypes';
import { Card, Row, Col, Collapse, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const MovieDescription = ({
	movieData,
}: {
	movieData: MovieData | undefined;
}) => {
	const [openDescription, setOpenDescription] = useState(false);
	const { t }: i18translateType = useTranslation('common');

	return (
		<>
			<Container className="ms-0 p-0 mb-3" fluid>
				<Button
					variant="transparent"
					onClick={() => setOpenDescription(!openDescription)}
					aria-controls="description-section"
					aria-expanded={openDescription}
				>
					{t('movieInfo.readMore')}
				</Button>
			</Container>
			<Collapse in={openDescription}>
				<Row id="description-section">
					<Col className="mb-sm-0 mb-2" sm>
						<Row className="mb-3">
							<Card.Title className="fs-3">{t('movieInfo.plot')}</Card.Title>
							<Card.Text style={{ color: '#333' }}>{movieData?.Plot}</Card.Text>
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
									{t('movieInfo.country')}:
								</Card.Title>
								<Card.Text className="fs-5 ms-1">
									{movieData?.Country}
								</Card.Text>
							</div>
						</Row>
					</Col>
					<Col sm>
						<Row className="mb-3">
							<Card.Title>
								<span>{t('movieInfo.actors')}:</span>{' '}
								<strong>{movieData?.Actors}</strong>
							</Card.Title>
							<Card.Title>
								<span>{t('movieInfo.director')}:</span>{' '}
								<strong>{movieData?.Director}</strong>
							</Card.Title>{' '}
						</Row>
						<Row>
							<Card.Title>
								<span>{t('movieInfo.category')}:</span>{' '}
								<strong>{movieData?.Genre}</strong>
							</Card.Title>{' '}
							<Card.Title>
								<span>{t('nav.language')}:</span>{' '}
								<strong>{movieData?.Language}</strong>
							</Card.Title>
						</Row>
					</Col>
				</Row>
			</Collapse>
		</>
	);
};

export default MovieDescription;
