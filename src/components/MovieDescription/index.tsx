import { Movie, Crew, Cast } from '../../types/appTypes';
import { Card, Row, Col, Collapse, Button, Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

const MovieDescription = ({
	movie,
	crew,
	cast,
}: {
	movie: Movie | undefined;
	crew: Array<Crew> | undefined;
	cast: Array<Cast> | undefined;
}) => {
	const [openDescription, setOpenDescription] = useState(false);
	const { t }: i18translateType = useTranslation('common');
	const [producer, setProducer] = useState('');
	const [writer, setWriter] = useState('');
	const [director, setDirector] = useState('');

	useEffect(() => {
		const getProducer = () => {
			const first = crew?.find((obj) => {
				return obj.department === 'Production';
			});
			const second = crew?.find((obj) => {
				return obj.department === 'Writing';
			});
			const third = crew?.find((obj) => {
				return obj.department === 'Directing';
			});
			if (second) {
				setWriter(second.name);
			}
			if (first) {
				setProducer(first.name);
			}
			if (third) {
				setDirector(third.name);
			}
		};

		if (crew) {
			getProducer();
		}
	}, [crew]);

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
							<Card.Text style={{ color: '#333' }}>
								{movie?.description_full}
							</Card.Text>
						</Row>
						<Row>
							<div className="d-flex align-items-center mb-1">
								<Card.Title className="m-0 p-0">Imdb:</Card.Title>
								<Card.Text className="fs-5 ms-1">{movie?.rating}</Card.Text>
							</div>
							<div className="d-flex align-items-center ">
								{/* <Card.Title className="m-0 p-0">
									{t('movieInfo.country')}:
								</Card.Title>
								<Card.Text className="fs-5 ms-1">
									{movie?.}
								</Card.Text> */}
							</div>
							{/* <Card.Title>
								<span>{t('movieInfo.category')}:</span>
								<strong>
									{movie &&
										movie.genre.map((obj) => (
											<div key={obj['genreName']}>{obj['genreName']}</div>
										))}
								</strong>
							</Card.Title> */}
							<Card.Title>
								<span>{t('nav.language')}:</span>
								<strong>{movie?.language}</strong>
							</Card.Title>
						</Row>
					</Col>
					<Col sm>
						<Row className="mb-3">
							<Card.Title>
								<span>{t('movieInfo.director')}</span>
								&nbsp;
								<strong>{crew && director}</strong>
							</Card.Title>
							<hr />
							<Card.Title>
								<span>Writer</span>
								&nbsp;
								<strong>{crew && writer}</strong>
							</Card.Title>
							<hr />
							<Card.Title>
								<span>Producer</span>
								&nbsp;
								<strong>{crew && producer}</strong>
							</Card.Title>
							<hr />
							<Card.Title>
								<span>{t('movieInfo.actors')}</span>
							</Card.Title>
							<Container></Container>
						</Row>
						{cast &&
							cast.slice(0, 3).map((actor: Cast) => (
								<div key={actor.id}>
									<Row>
										<Col xs={1}>
											{actor.profile_path && (
												<img
													src={
														'https://image.tmdb.org/t/p/w45' +
														actor.profile_path
													}
													className="rounded"
													alt="actor image"
												/>
											)}
										</Col>
										<Col>
											<strong>{actor.name}</strong>
											<br />
											{actor.character}
										</Col>
									</Row>
									<br />
								</div>
							))}
					</Col>
				</Row>
			</Collapse>
		</>
	);
};

export default MovieDescription;
