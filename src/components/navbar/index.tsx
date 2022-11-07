import { signOut, useSession } from 'next-auth/react';
import {
	Container,
	Navbar,
	Image,
	Nav,
	Button,
	Dropdown,
	DropdownButton,
} from 'react-bootstrap';
import { MdLogout } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

const LanguageMenu = () => {
	const { i18n } = useTranslation('common');

	return (
		<>
			<DropdownButton
				variant="transparent"
				id="dropdown-basic-button"
				title="Language"
				className="border-0"
				align="end"
			>
				<Container fluid>
					<Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
						<div className="d-flex align-items-center ">
							<Container>
								<Image src="/english.png" fluid />
							</Container>
							<span>English</span>
						</div>
					</Dropdown.Item>

					<Dropdown.Item onClick={() => i18n.changeLanguage('fi')}>
						<div className="d-flex align-items-center">
							<Container>
								<Image src="/finnish.png" fluid />
							</Container>
							<span>Finnish</span>
						</div>
					</Dropdown.Item>
				</Container>
			</DropdownButton>
		</>
	);
};

const NavigationBar = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const { data: session } = useSession();
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
								<LanguageMenu />
							</Nav.Item>
							<Nav.Item className="me-3">
								<Navbar.Text className="fs-5">
									test user
									{session?.user?.name}
								</Navbar.Text>
							</Nav.Item>
							<Nav.Item className="d-none d-md-block">
								<motion.div
									className="box"
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.9 }}
									transition={{ type: 'spring', stiffness: 400, damping: 17 }}
								>
									<Button
										className="d-flex justify-content-center align-items-center"
										onClick={() =>
											signOut({ callbackUrl: 'http://localhost:3000' })
										}
										variant="outline-dark"
									>
										<p className="p-0 m-0 me-1 ">Logout</p>
										<MdLogout className="fs-5 p-0 m-0" />
									</Button>
								</motion.div>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
