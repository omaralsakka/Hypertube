import { signOut, useSession } from 'next-auth/react';
import { Container, Navbar, Image, Nav, Button } from 'react-bootstrap';
import { MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { useSession } from 'next-auth/react';

const NavigationBar = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
  	const { data: session } = useSession()
	return (
		<>
			<Navbar
				className="shadow-0 px-3 mx-auto animate-in"
				style={{ animationDelay: '800ms' }}
			>
				<Container className="d-flex align-items-center" fluid>
					<Navbar.Brand href="/home">
						<Image
							width="100"
							src={LogoPng}
							className="d-inline-block align-top"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto d-flex align-items-center w-100">
							<Nav.Link className="mx-3" href="/home">
								Home
							</Nav.Link>

							<Nav.Link className="mx-3" href="/settings">
								Settings
							</Nav.Link>
							<Nav.Item className="ms-md-auto me-3 d-none d-md-block">
								<Navbar.Text className="fs-5">
									{session?.user?.name}
								</Navbar.Text>
							</Nav.Item>
							<Nav.Item className="d-none d-md-block">
								<Button
									onClick={() =>
										signOut({ callbackUrl: 'http://localhost:3000' })
									}
									size="sm"
									variant="warning"
								>
									<MdLogout className="fs-5" />
								</Button>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
