import { Card } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';

const MovieCard = ({ movie }: { movie: Movie }) => {
	if (!movie.medium_cover_image) {
		return <></>;
	}
	return (
		<>
			<Card className="m-3" style={{ maxWidth: '100vw', minWidth: '20vw' }}>
				<Card.Img src={movie.medium_cover_image} alt="Card image" />
				{/* <Card.ImgOverlay> */}
				{/* <Card.Title>Card title</Card.Title>
					<Card.Text>
						This is a wider card with supporting text below as a natural lead-in
						to additional content. This content is a little bit longer.
					</Card.Text>
					<Card.Text>Last updated 3 mins ago</Card.Text> */}
				{/* </Card.ImgOverlay> */}
			</Card>
		</>
	);
};

export default MovieCard;
