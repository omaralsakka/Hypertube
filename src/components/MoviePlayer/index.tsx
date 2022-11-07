import { Container } from 'react-bootstrap';
import ReactPlayer from 'react-player';

const MoviePlayer = ({ movieUrl, subtitles}: { movieUrl: string, subtitles: [] | any }) => {
	return (
		<>
			<Container
				className="bg-dark p-0"
				style={{ minHeight: '720px', maxHeight: '60vh' }}
				fluid
			>
				<ReactPlayer
					url={movieUrl}
					controls={true}
					playing={true}
					width="100%"
					style={{
						objectFit: 'cover',
						minHeight: '720px',
						maxHeight: '60vh',
						zIndex: '10',
					}}
					config={{
						file: {
							tracks: subtitles,
						},
					}}
				/>
			</Container>
		</>
	);
};

export default MoviePlayer;
