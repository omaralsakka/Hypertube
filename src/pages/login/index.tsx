import { MouseEvent, useEffect, useState } from 'react';
import { FormCheck, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Form from 'react-bootstrap/Form';
import { signIn, getProviders } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';

import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsGithub } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useRouter } from 'next/router'

type Inputs = {
	email: string;
	password: string;
};

const Login = ({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	const [credentialsError, setCredentialsError] = useState(false);
	const [verifiedError, setVerifiedError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const { t }: i18translateType = useTranslation('common');
	const router = useRouter();


	const onEmailSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const email = getValues('email');
		console.log(email);
		const user = await signIn('email', {
			email: email,
			callbackUrl: 'http://localhost:3000/home',
		});
		console.log(user);
	};
	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		setIsLoading(true);
		console.log(data);
		const user = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
			// redirect: false is required to be able to handle server side error messages gracefully. Without it error messages are hard to show in user friendly way.
		});
		console.log(user);
		setIsLoading(false);
		if (user?.error === 'CredentialsSignin')
			setCredentialsError(true)
		else
			setCredentialsError(false)
		if (user?.error === 'AccessDenied')
			setVerifiedError(true)
		else
			setVerifiedError(false)
		if (user?.status === 200) {
			setSuccess(true)
		}
	};
	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
	});

	const {
		watch,
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	// redirect: false option skips normal callbackurl so redirection needs to be done manually.
	// Redirect on success
	useEffect(() => {
		if (!success || !router.isReady) return
		
		setTimeout(() => {
			router.replace('/home');
		}, 2000)
	}, [success, router.isReady]);
	
	// Redirect on lacking email verification
	useEffect(() => {
		if (!verifiedError || !router.isReady) return
		
		setTimeout(() => {
			router.replace('/not-verified');
		}, 2000)
	}, [verifiedError, router.isReady]);

	return (
		<>
			<Container className="d-flex justify-content-center p-3 mb-4">
				<Card className="w-100 glass-background border-0">
					<Card.Body>
						<Row style={{ minHeight: '50vh' }}>
							<Col
								md="10"
								lg="6"
								className="order-2 order-lg-1 d-flex flex-column align-items-center mb-3 p-5"
							>
								<Card.Title className="display-5 text-dark mb-5">
									<strong>{t('landing.login')}</strong>
								</Card.Title>
								<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Group className={flexColCenter}>
										<Container>
											<div className="d-flex flex-row align-items-center mb-4 ">
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
											{errors.email?.message && (
												<p>{errors.email?.message as string}</p>
											)}
											<div className="d-flex flex-row align-items-center mb-4 ">
												<RiLockPasswordFill className="me-2 fs-4" />
												<div className="me-3">
													<Form.Control
														placeholder={t('form.password')}
														className="border-bottom comment-form bg-transparent"
														id="loginPassword"
														type={passType}
														{...register('password')}
														aria-invalid={errors.password ? 'true' : 'false'}
													/>
												</div>
											</div>

											{errors.password?.message && (
												<p>{errors.password?.message as string}</p>
											)}
											<div className="mb-4">
												<FormCheck
													type="checkbox"
													label={t('form.showPass')}
													onClick={() =>
														passType === 'password'
															? setPassType('text')
															: setPassType('password')
													}
												/>
											</div>
											{credentialsError && <p className="text-danger">Invalid username or password</p>}
											{verifiedError && <p className="text-danger">Your email address hasn't been verified</p>}
											{success && <p className="text-success">Logged in successfully</p>}
										</Container>
										<div style={{ minHeight: '5vh' }}>
											<Button
												type="submit"
												variant="outline-warning"
												disabled={!isValid || !isDirty || isLoading}
											>
												{t('landing.login')}
											</Button>
										</div>
									</Form.Group>
								</Form>
								<Container className="d-flex flex-column align-items-center justify-content-center p-3">
									<div className="d-flex">
										{providers &&
											Object.values(providers).map((provider) =>
												provider.name !== 'Credentials' &&
												provider.name !== 'Email' ? (
													<div className="p-1 mb-2" key={provider.name}>
														<Button
															className="d-flex align-items-center justify-content-center p-2"
															variant={
																provider.name === '42 School'
																	? 'primary'
																	: 'dark'
															}
															onClick={() =>
																signIn(provider.id, {
																	callbackUrl: 'http://localhost:3000/home',
																})
															}
														>
															<span className="me-2">
																{t('form.loginWith')}
															</span>
															{provider.name === 'GitHub' && <BsGithub />}
															{provider.name === '42 School' && (
																<Image
																	src="/42.png"
																	style={{ maxWidth: '15px' }}
																/>
															)}
														</Button>
													</div>
												) : null
											)}
									</div>
									<div className="p-1 mb-2" key="Email">
										<Button
											variant="light"
											className="d-flex align-items-center justify-content-center p-2"
											onClick={onEmailSubmit}
										>
											<span className="me-2">{t('form.loginWithEmail')}</span>
											<AiOutlineMail />
										</Button>
									</div>
								</Container>
								<Container className="p-3 text-center">
									<Link href="/forgot-password">
										<a>{t('form.forgotPass')}</a>
									</Link>
								</Container>
								<div>
									<p className="text-muted">
										{t('form.newSign')}{' '}
										<Link href="/signup">{t('landing.signup')}</Link>
									</p>
								</div>
							</Col>
							<Col
								md="10"
								lg="6"
								className="order-1 order-lg-2 d-flex align-items-center justify-content-center"
							>
								<Card.Img src={LogoPng} className="w-75" />
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

export default Login;
