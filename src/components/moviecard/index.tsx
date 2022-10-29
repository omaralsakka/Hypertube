import { Card } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import Link from 'next/link';
import MovieCardOverlay from '../movieCardOverlay';

const MovieCard = ({
	movie,
	style,
	viewType,
}: {
	movie: Movie;
	style: {};
	viewType: string;
}) => {
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
								currentTarget.src = '/not-found-ht.png';
							}}
						/>
						<MovieCardOverlay movie={movie} viewType={viewType} />
					</Card>
				</a>
			</Link>
		</>
	);
};

export default MovieCard;
