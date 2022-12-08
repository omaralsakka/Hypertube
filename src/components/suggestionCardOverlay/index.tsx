import { Card, Container, Row, Col } from 'react-bootstrap';
import { AiFillStar } from 'react-icons/ai';
import { movieRate } from '../../utils/helperFunctions';

const SuggestionCardOverlay = ({
	movie,
	viewType,
}: {
	movie: any;
	viewType: string;
}) => {
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
								{movieRate(movie.vote_average)}
							</span>
						</Col>

						<>
							<Col>
								<strong>{movie.release_date.slice(0, 4)}</strong>
							</Col>
							<Col className="d-flex align-items-center">
								<strong className="ms-1">
									{movie.vote_average.toFixed(1)}
								</strong>
								<AiFillStar style={{ color: 'yellow' }} />
							</Col>
						</>
					</Row>
				</div>
			</Container>
		</Card.ImgOverlay>
	);
};

export default SuggestionCardOverlay;
