import { useState } from 'react';
import { FormCheck } from 'react-bootstrap';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn, getProviders } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import { Container, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

type Inputs = {
	email: string;
	password: string;
};

const Login = ({
	providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');

	const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
		event?.preventDefault();
		console.log(data);
		const user = await signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: 'http://localhost:3000/home',
		});
		console.log(user);
	};

	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
		password: z.string().min(1, { message: 'Required' }),
	});

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	return (
		<>
			<Container className="d-flex justify-content-center p-3 mb-4">
				<Card className="w-100 glass-background">
					<Card.Body>
						<Row style={{ minHeight: '50vh' }}>
							<Col
								md="10"
								lg="6"
								className="order-2 order-lg-1 d-flex flex-column align-items-center mb-3 p-5"
							>
								<Card.Title className="display-5 text-dark mb-5">
									<strong>Sign up</strong>
								</Card.Title>
								<Form onSubmit={handleSubmit(onSubmit)}>
									<Form.Group className="mb-3 d-flex flex-column align-items-center justify-content-center">
										<Container>
											<div className="d-flex flex-row align-items-center mb-4 ">
												<MdAlternateEmail className="me-2 fs-4" />
												<div className="me-3">
													<Form.Control
														id="loginEmail"
														className="border-bottom comment-form bg-transparent"
														placeholder="Email"
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
														placeholder="Password"
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
													label="show password"
													onClick={() =>
														passType === 'password'
															? setPassType('text')
															: setPassType('password')
													}
												/>
											</div>
										</Container>
										<div className="mb-4" style={{ minHeight: '5vh' }}>
											<Button
												type="submit"
												variant="outline-warning"
												size="lg"
												disabled={!isValid || !isDirty}
											>
												Login
											</Button>
										</div>
									</Form.Group>
								</Form>
								<div>
									<p className="text-muted">
										New to Hypertube? <Link href="/signup">Sign up</Link>
									</p>
								</div>
								{providers &&
									Object.values(providers).map((provider) =>
										provider.name !== 'Credentials' ? (
											<div key={provider.name}>
												<button
													onClick={() =>
														signIn(provider.id, {
															callbackUrl: 'http://localhost:3000/home',
														})
													}
												>
													Sign in with {provider.name}
												</button>
											</div>
										) : null
									)}
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
