import { MovieData } from '../../types/appTypes';
import { Card, Row, Col, Collapse, Button, Container } from 'react-bootstrap';
import { useState } from 'react';

const MovieDescription = ({
	movieData,
}: {
	movieData: MovieData | undefined;
}) => {
	const [openDescription, setOpenDescription] = useState(false);

	return (
		<>
			<Container className="ms-0 p-0 mb-3" fluid>
				<Button
					variant="transparent"
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
								<Card.Title className="m-0 p-0">Country:</Card.Title>
								<Card.Text className="fs-5 ms-1">
									{movieData?.Country}
								</Card.Text>
							</div>
						</Row>
					</Col>
					<Col>
						<Row className="mb-3">
							<Card.Title>
								<span>Actors:</span> <strong>{movieData?.Actors}</strong>
							</Card.Title>
							<Card.Title>
								<span>Director:</span> <strong>{movieData?.Director}</strong>
							</Card.Title>{' '}
						</Row>
						<Row>
							<Card.Title>
								<span>Category:</span> <strong>{movieData?.Genre}</strong>
							</Card.Title>{' '}
							<Card.Title>
								<span>Language:</span> <strong>{movieData?.Language}</strong>
							</Card.Title>
						</Row>
					</Col>
				</Row>
			</Collapse>
		</>
	);
};

export default MovieDescription;
