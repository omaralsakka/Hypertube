import { MouseEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { flexColCenter } from '../../styles/styleVariables';
import { EmailInput } from '../../types/appTypes';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useSession } from 'next-auth/react';

const ForgotPassword = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [emailSent, setEmailSent] = useState(false);
	const { t }: i18translateType = useTranslation('common');
	const { status, data } = useSession();

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const onSubmit: SubmitHandler<EmailInput> = (data) => {};
	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
	});

	const onEmailSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const email = getValues('email');
		const user = await signIn('email', {
			email: email,
			callbackUrl: 'http://localhost:3000/settings',
		});
		setEmailSent(true);
	};
	
	const {
		watch,
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<EmailInput>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		console.log('THIS IS STATUS : ', status);
		console.log('THIS IS DATA : ', data);
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
					<Card className="w-75 glass-background border-0">
						<Card.Body>
							{emailSent ? (
								<div className={`${flexColCenter} w-75 m-auto`}>
									<Card.Title className="display-6 text-dark mb-5">
										<strong>{t('form.emailSent')}Email sent</strong>
									</Card.Title>
									<Card.Title className="mb-5 w-50 text-center">
										{t('form.emailSentMsg')}
									</Card.Title>
								</div>
							) : (
								<div className={`${flexColCenter} w-75 m-auto`}>
									<Card.Title className="display-6 text-dark mb-5">
										<strong>{t('form.forgotPass')}</strong>
									</Card.Title>
									<Card.Title className="mb-5 w-50 text-center">
										{t('form.forgotPassMsg')}
									</Card.Title>
									<Container className="d-flex justify-content-center">
										<Form onSubmit={handleSubmit(onSubmit)}>
											<Form.Group className={`${flexColCenter} mb-3`}>
												<Container className="mb-4">
													<div className="d-flex align-items-center mb-4 ">
														<MdAlternateEmail className="me-2 fs-4" />
														<div className="me-3">
															<Form.Control
																id="loginEmail"
																className="border-bottom comment-form bg-transparent"
																placeholder={t('form.email')}
																type="email"
																{...register('email')}
															></Form.Control>
														</div>
													</div>
												</Container>
												<div style={{ minHeight: '5vh' }}>
													<Button
														type="submit"
														variant="outline-warning"
														size="lg"
														onClick={onEmailSubmit}
														disabled={!isValid || !isDirty}
													>
														{t('form.submit')}
													</Button>
												</div>
											</Form.Group>
										</Form>
									</Container>
									<div>
										<p className="text-muted">
											{t('form.likeNewAcc')}{' '}
											<Link href="/signup">{t('landing.signup')}</Link>
										</p>
									</div>
								</div>
							)}
						</Card.Body>
					</Card>
				</Container>
			)}
		</>
	);
};

export default ForgotPassword;
