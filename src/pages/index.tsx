import '../components/i18nextConf';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { motion } from 'framer-motion';
import ActionButton from '../components/landingButtons';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../types/appTypes';
import { setPageLanguage } from '../utils/helperFunctions';

export function Component() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}

const Home: NextPage = () => {
	const logoPng = '/logo-hypertube/logo-no-background.png';
	const { t }: i18translateType = useTranslation('common');
	const { i18n } = useTranslation('common');

	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const componentArray = [
		<ActionButton
			key="login-key"
			path="/login"
			variant="warning"
			text={t('landing.login')}
		/>,
		<ActionButton
			key="signup-key"
			path="/signup"
			variant="outline-primary"
			text={t('landing.signup')}
		/>,
	];

	return (
		<>
			<Container
				style={{ minHeight: '100vh' }}
				className="d-flex flex-column align-items-center mt-3 p-2"
				fluid
			>
				<Card className="bg-transparent shadow-0 border-0">
					<Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
						<Row className="mb-5">
							<Col>
								<motion.div
									initial={{ y: -100, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 1 }}
								>
									<Container className="w-50">
										<Image src={logoPng} fluid />
									</Container>
								</motion.div>
							</Col>
						</Row>
						<Row className="p-3 mb-5">
							<Col>
								<Container className="d-flex justify-content-center">
									<motion.div
										className="container d-flex justify-content-center"
										variants={container}
										initial="hidden"
										animate="visible"
									>
										{componentArray.map((comp) => comp)}
									</motion.div>
								</Container>
							</Col>
						</Row>
						<Row className="text-center mb-3">
							<motion.div
								className="d-flex justify-content-center darkFade w-100"
								initial={{ x: 100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 1 }}
							>
								<Card.Text className="display-6" style={{ color: '#333' }}>
									<strong>{t('landing.slogan')}</strong>
								</Card.Text>
							</motion.div>
						</Row>
					</Card.Body>
				</Card>
				<motion.div
					className="d-flex justify-content-center darkFade w-100"
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 1 }}
				>
					<Row className="justify-content-center w-50 extraShadow">
						<Card className="glass-background p-0 ">
							<Card.Body className="p-0">
								<Container
									className="cinemaThumbnail rounded"
									fluid
								></Container>
							</Card.Body>
						</Card>
					</Row>
				</motion.div>
			</Container>
		</>
	);
};

export default Home;
