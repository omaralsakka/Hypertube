import { useSession } from 'next-auth/react';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootReducer } from '../../types/appTypes';
import { motion } from 'framer-motion';
import LanguageMenu from '../languageMenu';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useEffect, useState } from 'react';
import { setPageLanguage } from '../../utils/helperFunctions';
import LogoutBtn from '../logoutBtn';
import { trpc } from '../../utils/trpc';

const NavigationBar = () => {
	const LogoPng = '/logo-hypertube/logo-no-background.png';
	const userInStore = useSelector((state: RootReducer) => state.userReducer);
	const { t }: i18translateType = useTranslation('common');
	const { i18n } = useTranslation('common');
	const { data: session } = useSession();
	const [userImg, setUserImg] = useState('/defaultImg2.png');
	const { data } = trpc.user.get.useQuery(
		{ id: !session?.token?.user?.id ? '0' : session?.token?.user?.id },
		{
			placeholderData: { id: '', name: 'Name', email: 'Email', password: '' },
		}
	);
	useEffect(() => {
		setPageLanguage(i18n);
	}, []);
	useEffect(() => {
		if (data?.user) {
			data?.user?.image !== null
				? setUserImg(`/images/${data?.user?.image}`)
				: setUserImg('/defaultImg2.png');
		}
	}, [data]);

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
							<Nav.Item className="logout-btn-mobile ms-auto me-3">
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
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav" className="p-1">
								<Nav className="me-auto d-flex align-items-center w-100">
									<Nav.Link className=" mx-md-3" href="/home">
										{t('nav.home')}
									</Nav.Link>
									{/* <Nav.Item className="ms-md-auto me-md-3 mb-md-0 mb-1"> */}
									<Nav.Item className="ms-lg-auto mb-1">
										<LanguageMenu />
									</Nav.Item>
									<Nav.Item className="me-md-3">
										<Nav.Link href="/settings" className="p-0 m-0">
											<motion.div
												className="nav-user-img_container"
												whileHover={{ scale: [null, 1.2, 1.2] }}
												transition={{ duration: 0.3 }}
											>
												<Image
													src={userImg}
													className="avatar-img rounded-circle"
													alt="user image"
												/>
											</motion.div>
										</Nav.Link>
									</Nav.Item>
									<Nav.Item className="logout-btn-default">
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
