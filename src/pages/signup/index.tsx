import { MouseEvent, useEffect, useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../../utils/trpc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inputs } from '../../types/appTypes';
import { Container, Card, Form, Row, Col, Image } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiUser } from 'react-icons/hi';
import { AiOutlineMail } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { InferGetServerSidePropsType } from 'next';
import { signIn, getProviders, signOut } from 'next-auth/react';
import { flexColCenter } from '../../styles/styleVariables';
import { useTranslation } from 'react-i18next';
import { i18translateType } from '../../types/appTypes';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Signup = ({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	const { t }: i18translateType = useTranslation('common');
	const [success, setSuccess] = useState(false);
	const router = useRouter();
	const { status } = useSession();

	const onEmailSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const email = getValues('email');
		const user = await signIn('email', {
			email: email,
			callbackUrl: 'http://localhost:3000/home',
		});
		if (user) setSuccess(true);
	};

	const schema = z.object({
		name: z.string().min(1, { message: 'Required' }),
		password: z
			.string()
			.regex(new RegExp('.*[A-Z].*'), {
				message: 'One uppercase character required',
			})
			.regex(new RegExp('.*[a-z].*'), {
				message: 'One lowercase character required',
			})
			.regex(new RegExp('.*\\d.*'), { message: 'One number required' })
			.min(8, {
				message: 'The password must be more than 8 characters in length',
			})
			.max(255, {
				message: "The password can't be more than 255 characters in length",
			}),
		email: z.string().email().min(1, { message: 'Required' }),
	});

	const userCreatedToast = () =>
		toast.success(t('form.userCreated'), { position: 'top-center' });

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

	const mutation = trpc.user.create.useMutation();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		try {
			const response = mutation.mutate({
				name: data.name,
				email: data.email,
				password: data.password,
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!mutation.isSuccess) return;
		setTimeout(() => {
			router.push('/login');
		}, 2000);
		userCreatedToast();
	}, [mutation.isSuccess]);

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
										<strong>{t('landing.signup')}</strong>
									</Card.Title>
									<Form onSubmit={handleSubmit(onSubmit)}>
										<Form.Group className={flexColCenter}>
											<Container>
												<div className="d-flex flex-row align-items-center mb-4">
													<HiUser className="me-2 fs-4" />

													<div className="me-3">
														<Form.Control
															id="firstName"
															className="border-bottom comment-form bg-transparent"
															placeholder={t('form.name')}
															type="text"
															{...register('name')}
														></Form.Control>
													</div>
												</div>
												<div className="d-flex flex-row align-items-center mb-4 ">
													<MdAlternateEmail className="me-2 fs-4" />
													<div className="me-3">
														<Form.Control
															id="signupEmail"
															className="border-bottom comment-form bg-transparent"
															placeholder={t('form.email')}
															type="email"
															{...register('email')}
														></Form.Control>
													</div>
												</div>
												<div className="d-flex flex-row align-items-center mb-4 ">
													<RiLockPasswordFill className="me-2 fs-4" />
													<div className="me-3">
														<Form.Control
															placeholder={t('form.password')}
															className="border-bottom comment-form bg-transparent"
															id="signupPassword"
															type={passType}
															{...register('password')}
														/>
													</div>
												</div>
												{errors?.password && getValues('password') && (
													<p className="text-danger">
														{errors?.password?.message}
													</p>
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
											</Container>
											<div style={{ minHeight: '5vh' }}>
												<Button
													type="submit"
													variant="outline-warning"
													disabled={!isValid || !isDirty || mutation.isLoading}
												>
													{t('form.register')}
												</Button>
											</div>
										</Form.Group>
									</Form>
									{mutation.isError && (
										<Container className="d-flex justify-content-center mb-4">
											<p className="text-danger">{mutation.error.message}</p>
										</Container>
									)}
									{/* {mutation.isSuccess && (
										<Container className="d-flex justify-content-center mb-4">
											<p className="text-success">User created</p>
										</Container>
									)} */}
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
																	{t('form.signupWith')}{' '}
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
									</Container>
									<div>
										<p className="text-muted">
											{t('form.haveAccount')}{' '}
											<Link href="/login">{t('landing.login')}</Link>
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
			)}
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

export default Signup;
