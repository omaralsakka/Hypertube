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
import { i18translateType } from '../../types/appTypes';

const LanguageMenu = () => {
	const { i18n } = useTranslation('common');
	const { t }: i18translateType = useTranslation('common');
	return (
		<>
			<DropdownButton
				variant="transparent"
				id="dropdown-basic-button"
				title={t('nav.language')}
				className="border-0"
				align="end"
			>
				<Container fluid>
					<Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
						<div className="d-flex align-items-center ">
							<Container>
								<Image src="/english.png" fluid />
							</Container>
							<span>{t('nav.english')}</span>
						</div>
					</Dropdown.Item>

					<Dropdown.Item onClick={() => i18n.changeLanguage('fi')}>
						<div className="d-flex align-items-center">
							<Container>
								<Image src="/finnish.png" fluid />
							</Container>
							<span>{t('nav.finnish')}</span>
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

	const { t }: i18translateType = useTranslation('common');
	return (
		<>
			<Navbar
				className="shadow-0 px-3 mx-auto animate-in"
				style={{ animationDelay: '800ms' }}
			>
				<Container className="d-flex align-items-center" fluid>
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
									<Nav.Link className="mx-3" href="/home">
										{t('nav.home')}
									</Nav.Link>

									<Nav.Link className="mx-3" href="/settings">
										{t('nav.settings')}
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
											transition={{
												type: 'spring',
												stiffness: 400,
												damping: 17,
											}}
										>
											<Button
												className="d-flex justify-content-center align-items-center"
												onClick={() =>
													signOut({ callbackUrl: 'http://localhost:3000' })
												}
												variant="outline-dark"
											>
												<p className="p-0 m-0 me-1 ">{t('nav.logout')}</p>
												<MdLogout className="fs-5 p-0 m-0" />
											</Button>
										</motion.div>
									</Nav.Item>
								</Nav>
							</Navbar.Collapse>
						</>
					) : (
						<Nav.Item className="ms-md-auto me-3 d-none d-md-block">
							<LanguageMenu />
						</Nav.Item>
					)}

					{/* <Navbar.Brand href="/home">
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
								{t('nav.home')}
							</Nav.Link>

							<Nav.Link className="mx-3" href="/settings">
								{t('nav.settings')}
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
										<p className="p-0 m-0 me-1 ">{t('nav.logout')}</p>
										<MdLogout className="fs-5 p-0 m-0" />
									</Button>
								</motion.div>
							</Nav.Item>
						</Nav>
					</Navbar.Collapse> */}
				</Container>
			</Navbar>
		</>
	);
};

export default NavigationBar;
