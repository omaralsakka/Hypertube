import { useSession } from 'next-auth/react';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { motion } from 'framer-motion';
import LanguageMenu from '../languageMenu';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useEffect } from 'react';
import { setPageLanguage } from '../../utils/helperFunctions';
import LogoutBtn from '../logoutBtn';

const NavigationBar = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const { data: session } = useSession();
	const { t }: i18translateType = useTranslation('common');
	const { i18n } = useTranslation('common');

	useEffect(() => {
		setPageLanguage(i18n);
	}, []);
	return (
		<>
			<Navbar
				expand="lg"
				className="shadow-0 px-3 mx-auto animate-in"
				style={{ animationDelay: '800ms' }}
			>
				<Container fluid>
					{session?.user?.name ? (
						<>
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
									<Nav.Link className=" mx-md-3" href="/home">
										{t('nav.home')}
									</Nav.Link>

									<Nav.Link className="mx-md-3" href="/settings">
										{t('nav.settings')}
									</Nav.Link>
									<Nav.Item className="ms-md-auto me-md-3 mb-md-0 mb-1">
										<LanguageMenu />
									</Nav.Item>
									<Nav.Item className="me-md-3 mb-md-0 mb-3">
										<Navbar.Text className="fs-5">
											{session?.user?.name}
										</Navbar.Text>
									</Nav.Item>
									<Nav.Item>
										<motion.div
											className="box"
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.9 }}
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 17,
											}}
										>
											<LogoutBtn t={t} />
										</motion.div>
									</Nav.Item>
								</Nav>
							</Navbar.Collapse>
						</>
					) : (
						<Nav.Item className="ms-auto me-3">
							<LanguageMenu />
						</Nav.Item>
					)}
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
