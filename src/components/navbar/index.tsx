import { Container, Navbar, Image, Nav } from 'react-bootstrap';

const NavigationBar = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	return (
		<>
			<Navbar>
				<Container className="d-flex align-items-center" fluid>
					<Navbar.Brand href="/home">
						<Image
							width="100"
							src={LogoPng}
							className="d-inline-block align-top"
						/>
					</Navbar.Brand>
					<Nav className="me-auto">
						<Nav.Link className="mx-3" href="/home">
							Home
						</Nav.Link>
						<Nav.Link className="mx-3" href="/settings">
							Settings
						</Nav.Link>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
