import { Card } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import Link from 'next/link';
import MovieCardOverlay from '../movieCardOverlay';
import { motion } from 'framer-motion';
const MovieCard = ({
	movie,
	style,
	viewType,
}: {
	movie: Movie;
	style: string;
	viewType: string;
}) => {
	if (!movie) {
		return <></>;
	}
	return (
		<>
			<Link
				href={{
					pathname: `/home/${movie.imdb_code}`,
					query: { movie: JSON.stringify(movie) },
				}}
			>
				<a>
					<motion.div
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.8,
							ease: [0, 0.71, 0.2, 1.01],
						}}
					>
						<Card
							className={`m-3 movieCard bg-transparent overflow-hidden ${style}`}
						>
							<Card.Img
								src={movie && movie?.medium_cover_image}
								alt="Card image"
								onError={({ currentTarget }) => {
									currentTarget.onerror = null;
									currentTarget.src = '/not-found-ht.png';
								}}
							/>
							<MovieCardOverlay movie={movie} viewType={viewType} />
						</Card>
					</motion.div>
				</a>
			</Link>
		</>
	);
};

export default MovieCard;
