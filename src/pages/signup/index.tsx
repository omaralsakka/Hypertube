import { useState } from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { trpc } from '../../utils/trpc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Inputs } from '../../types/appTypes';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { MdOutlinePersonalVideo } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { HiUser } from 'react-icons/hi';

const Signup = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [passType, setPassType] = useState('password');
	const [consent, setConsent] = useState(false);

	const schema = z.object({
		userName: z.string().min(1, { message: 'Required' }),
		userPassword: z.string().min(1, { message: 'Required' }),
		userEmail: z.string().min(1, { message: 'Required' }),
		firstName: z.string().min(1, { message: 'Required' }),
		lastName: z.string().min(1, { message: 'Required' }),
	});

	const notifyDefault = () => toast.success('Activation email sent');

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors, isSubmitting, isDirty, isValid },
	} = useForm<Inputs>({
		mode: 'onChange',
		resolver: zodResolver(schema),
	});

	const mutation = trpc.user.create.useMutation();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		try {
			console.log(data);
			mutation.mutate({
				name: data.userName,
				email: data.userEmail,
				password: data.userPassword,
			});
		} catch (err) {
			console.log(err);
		}
	};

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
											<div className="d-flex flex-row align-items-center mb-4">
												<HiUser className="me-2 fs-4" />

												<div className="me-3">
													<Form.Control
														id="firstName"
														className="border-bottom comment-form bg-transparent"
														placeholder="Name"
														type="text"
														{...register('firstName')}
													></Form.Control>
												</div>
											</div>
											<div className="d-flex flex-row align-items-center mb-4 ">
												<MdOutlinePersonalVideo className="me-2 fs-4" />
												<div className="me-3">
													<Form.Control
														id="signupEmail"
														className="border-bottom comment-form bg-transparent"
														placeholder="Email"
														type="email"
														{...register('userEmail')}
													></Form.Control>
												</div>
											</div>
											<div className="d-flex flex-row align-items-center mb-4 ">
												<RiLockPasswordFill className="me-2 fs-4" />
												<div className="me-3">
													<Form.Control
														placeholder="Password"
														className="border-bottom comment-form bg-transparent"
														id="signupPassword"
														type={passType}
														{...register('userPassword')}
													/>
												</div>
											</div>
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
												disabled={!isValid || !isDirty || mutation.isLoading}
											>
												Register
											</Button>
										</div>
									</Form.Group>
								</Form>
								{mutation.isError && <p>{mutation.error.message}</p>}
								{mutation.isSuccess && <p>User created</p>}
								<div>
									<p className="text-muted">
										Have an account? <Link href="/login">login</Link>
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

export default Signup;
