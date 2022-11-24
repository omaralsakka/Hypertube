import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { trpc } from '../../utils/trpc';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';

// Users are directed to this page from the verification link on their emails
const VerifyEmail = () => {
	const router = useRouter();
	const mutation = trpc.emailtoken.verify.useMutation();
	const { t }: i18translateType = useTranslation('common');

	useEffect(() => {
		const { token } = router.query;
		if(token !== undefined) {
			mutation.mutate({ token: token as string });
		} else {
			mutation.isError = true;
		}
	}, [router.query]);
	
	useEffect(() => {
		if (!mutation.isSuccess) return
		setTimeout(() => {
			signOut({ callbackUrl: 'http://localhost:3000/login' })
		}, 2000)
	}, [mutation.isSuccess]);

	/* useEffect(() => {
		if (mutation.data !== 'Email verified successfully.') return
		setTimeout(() => {
			signOut({ callbackUrl: 'http://localhost:3000/login' })
		}, 2000)
	}, [mutation.data]); */

	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0 p-5">
					<Card.Body>
						<div className={`${flexColCenter} w-75 m-auto`}>
							{mutation.isLoading ? (
								<>
									<Card.Title className="display-6 text-dark mb-5 ">
										<strong>{t('form.verifyingEmail')}</strong>
									</Card.Title>
								</>
							) : (
								<>
									{mutation.data === 'Email verified successfully.' ? <>
											<Card.Title className="display-6 text-dark mb-5">
												<strong>{t('form.verified')}</strong>
											</Card.Title>
											<Card.Title className="mb-5 w-50 text-center text-muted">
												{t('form.emailVerified')}
											</Card.Title>
											<Button
												onClick={() => signIn()}
												variant="outline-warning"
												size="lg"
											>
												{t('landing.login')}
											</Button>
										</> : <>
											<Card.Title className="display-6 text-dark mb-5 ">
												<strong>{t('form.errorOccurred')}</strong>
											</Card.Title>
										</>}
								</>
							)}
						</div>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default VerifyEmail;
