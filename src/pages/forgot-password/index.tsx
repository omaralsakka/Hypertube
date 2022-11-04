import { MouseEvent, useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { MdAlternateEmail } from 'react-icons/md';
import { flexColCenter } from '../../styles/styleVariables';
import { EmailInput } from '../../types/appTypes';

const forgotPassword = () => {
	const LogoPng = 'logo-hypertube/logo-no-background.png';
	const [emailSent, setEmailSent] = useState(false);
	const onSubmit: SubmitHandler<EmailInput> = (data) => console.log(data);
	const schema = z.object({
		email: z.string().min(1, { message: 'Required' }),
	});
	const onEmailSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const email = getValues('email');
		const user = await signIn('email', {
			email: email,
			callbackUrl: 'http://localhost:3000/change-password',
		});
		console.log(user);
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
	return (
		<>
			<Container className="d-flex justify-content-center p-5 mb-4">
				<Card className="w-75 glass-background border-0">
					<Card.Body>
						{emailSent ? (
							<div className={`${flexColCenter} w-75 m-auto`}>
								<Card.Title className="display-6 text-dark mb-5">
									<strong>Email sent</strong>
								</Card.Title>
								<Card.Title className="mb-5 w-50 text-center">
									We have sent you an email with the login link, please check
									your email.
								</Card.Title>
							</div>
						) : (
							<div className={`${flexColCenter} w-75 m-auto`}>
								<Card.Title className="display-6 text-dark mb-5">
									<strong>Forgot password</strong>
								</Card.Title>
								<Card.Title className="mb-5 w-50 text-center">
									Enter your email address below and we'll send you a link to
									login with.
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
															placeholder="Email"
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
													Submit
												</Button>
											</div>
										</Form.Group>
									</Form>
								</Container>
								<div>
									<p className="text-muted">
										Would you like a new account?{' '}
										<Link href="/signup">Sign up</Link>
									</p>
								</div>
							</div>
						)}
					</Card.Body>
				</Card>
			</Container>
		</>
	);
};

export default forgotPassword;
