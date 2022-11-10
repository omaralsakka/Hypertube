import { Container, Image } from 'react-bootstrap';

const LoadingLogo = () => {
	return (
		<>
			<Container
				className="d-flex align-items-center justify-content-center"
				fluid
				style={{ minHeight: '70vh' }}
			>
				<Container className="d-flex justify-content-center w-25">
					<Image
						className="loadingLogo"
						src="/logo-hypertube/logo-no-background.png"
						alt="hypertube logo"
						fluid
					/>
				</Container>
			</Container>
		</>
	);
};

export default LoadingLogo;
