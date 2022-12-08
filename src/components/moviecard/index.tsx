import { Card } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import MovieCardOverlay from '../movieCardOverlay';
import { LazyMotion, m } from 'framer-motion';

const MovieCard = ({
	movie,
	style,
	viewType,
}: {
	movie: Movie;
	style: string;
	viewType: string;
}) => {
	const loadFeatures = () => import('./features.js').then((res) => res.default);

	if (!movie) {
		return <></>;
	}
	return (
		<>
			<a href={`/home/${movie.imdb_code}`}>
				<LazyMotion features={loadFeatures} strict>
					<m.div
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
					</m.div>
				</LazyMotion>
			</a>
			{/* </Link> */}
		</>
	);
};

export default MovieCard;
