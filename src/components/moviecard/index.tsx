import { Card, Container } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import Link from 'next/link';

const MovieCard = ({ movie, style }: { movie: Movie; style: {} }) => {
	if (!movie) {
		return <></>;
	}
	return (
		<>
			<Link href={`/home/${movie.id}`}>
				<a>
					<Card
						className="m-3 movieCard bg-transparent overflow-hidden"
						style={style}
					>
						<Card.Img
							src={movie.medium_cover_image}
							alt="Card image"
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = '/notfound.png';
							}}
						/>

						<Card.ImgOverlay className="p-1 d-flex justify-content-center movieCard-OverLay">
							<Container fluid className="movieCard-Body mt-auto p-3 text-dark">
								<Card.Title className="mb-3">{movie.title}</Card.Title>
								<Card.Text>
									Genre:{' '}
									{movie.genres.map((genre) => (
										<span key={genre + '1'}>{genre} </span>
									))}{' '}
									<br />
									Rating: {movie.rating} <br />
									Year: {movie.year}
								</Card.Text>
							</Container>
						</Card.ImgOverlay>
					</Card>
				</a>
			</Link>
		</>
	);
};

export default MovieCard;
