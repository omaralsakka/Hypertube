import Link from 'next/link';
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

// User is redirected here, if they try to login with email before signing up.
const SignUpFirst = () => {
	const { t }: i18translateType = useTranslation('common');
	const { status } = useSession();

	useEffect(() => {
		if (status !== 'loading' && status !== 'unauthenticated') {
			window.location.replace('/home');
		}
	}, [status]);
	return (
		<>
			{status !== 'unauthenticated' ? (
				<></>
			) : (
				<Container className="d-flex justify-content-center p-5 mb-4">
					<Card className="w-75 glass-background border-0 p-5">
						<Card.Body>
							<div className={`${flexColCenter} w-75 m-auto`}>
								<Card.Title className="display-6 text-dark mb-5">
									<strong>{t('form.signupFirst')}</strong>
								</Card.Title>
								<Link href="/signup" passHref legacyBehavior>
									<Button variant="outline-warning" size="lg">
										{t('landing.signup')}
									</Button>
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default SignUpFirst;
