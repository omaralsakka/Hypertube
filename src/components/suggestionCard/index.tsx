import { Card } from 'react-bootstrap';
import { Movie } from '../../types/appTypes';
import Link from 'next/link';
import SuggestionCardOverlay from '../suggestionCardOverlay';
import { motion } from 'framer-motion';
const SuggestionCard = ({
	movie,
	style,
	viewType,
}: {
	movie: any;
	style: string;
	viewType: string;
}) => {
	console.log(movie);
	return (
		<Link href={`/home/${movie.imdb_code}`}>
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
							src={'https://image.tmdb.org/t/p/w154' + movie.poster_path}
							alt="Card image"
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = '/not-found-ht.png';
							}}
						/>
						<SuggestionCardOverlay movie={movie} viewType={viewType} />
					</Card>
				</motion.div>
			</a>
		</Link>
	);
};

export default SuggestionCard;
